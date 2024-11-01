import pool from '../config/db.js';
import {
    addPurchaseQuery,
    fetchItemPriceQuery,
    fetchUserBalanceQuery,
    updateBalanceQuery,
} from '../queries/purchases.queries.js';
import { CombinedItemResponse } from '../types/items/items.controller.types.js';

import { PurchaseItemReply, PurchaseItemRequest } from '../types/purchases/purchases.controller.types.js';
import { UserModel } from '../types/user/user.model.types.js';

export const purchaseItem = async (req: PurchaseItemRequest, reply: PurchaseItemReply) => {
    const { id, itemName } = req.body;
    try {
        const [userDataResponse, itemDataResponse] = await Promise.all([
            pool.query({ text: fetchUserBalanceQuery, values: [id] }),
            pool.query({
                text: fetchItemPriceQuery,
                values: [itemName],
            }),
        ]);

        const userData = userDataResponse.rows[0] as UserModel;
        const itemData = itemDataResponse.rows[0] as CombinedItemResponse;

        if (!userData || !itemData) {
            return reply.code(404).send('Item or user not found');
        }

        if (itemData.min_price === null) {
            return reply.code(400).send({ message: 'Price is null' });
        } else {
            if (Number(itemData.min_price) > Number(userData.balance)) {
                return reply.code(400).send({ message: 'Not enough money on balance' });
            }

            await Promise.all([
                pool.query(
                    addPurchaseQuery,
                    [userData.id, itemData.market_hash_name, Number(itemData.min_price)],
                    (err) => {
                        if (err) {
                            return reply.code(500).send({ error: 'Add purchasing went wrong' });
                        }
                    },
                ),
                pool.query(
                    updateBalanceQuery,
                    [userData.id, Number(userData.balance) - Number(itemData.min_price)],
                    (err) => {
                        if (err) {
                            return reply.code(500).send({ error: 'Updating balance went wrong' });
                        }
                    },
                ),
            ]);

            return reply.code(200).send({ updatedBalance: userData.balance - itemData.min_price });
        }
    } catch (error) {
        return reply.code(500).send({ error: 'Purchasing went wrong' });
    }
};

export default { purchaseItem };
