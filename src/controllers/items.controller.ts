import pool from '../config/db.js';

import { FastifyInstance } from 'fastify';
import {
    CombinedItemResponse,
    FetchItemsWithTwoMinPricesReply,
    ItemResponse,
} from '../types/items/items.controller.types.js';
import { fetchItemsWithTwoMinPricesQuery } from '../queries/items.queries.js';

export const fetchItemsWithTwoMinPrices = async (app: FastifyInstance, reply: FetchItemsWithTwoMinPricesReply) => {
    try {
        const cachedItems = await app.redis.get('items');

        if (!cachedItems) {
            try {
                const tradableItemsQuery = 'https://api.skinport.com/v1/items?app_id=730&currency=EUR&tradable=1';
                const nonTradableItemsQuery = 'https://api.skinport.com/v1/items?app_id=730&currency=EUR&tradable=0';

                const [tradableResponse, nonTradableResponse] = await Promise.all([
                    fetch(tradableItemsQuery),
                    fetch(nonTradableItemsQuery),
                ]);

                const tradableData = (await tradableResponse.json()) as ItemResponse[];
                const nonTradableData = (await nonTradableResponse.json()) as ItemResponse[];

                const nonTradableMap: Record<string, number | null> = {};

                nonTradableData.forEach((item) => {
                    nonTradableMap[item.market_hash_name] = item.min_price;
                });

                const combinedData: CombinedItemResponse[] = tradableData.map((item) => {
                    const nonTradablePrice = nonTradableMap[item.market_hash_name] || null;

                    return {
                        market_hash_name: item.market_hash_name,
                        min_price: item.min_price,
                        min_price_non_tradable: nonTradablePrice,
                    };
                });

                await app.redis.set('items', JSON.stringify(combinedData));

                try {
                    for (const item of combinedData) {
                        await pool.query({
                            text: fetchItemsWithTwoMinPricesQuery,
                            values: [item.market_hash_name, item.min_price, item.min_price_non_tradable],
                        });
                    }
                } catch (error) {
                    reply.code(500).send({ error: 'Insert item went wrong' });
                }
                reply.code(200).send({ items: combinedData });
            } catch (error) {
                reply.code(500).send({ error: 'Getting combined data went wrong' });
            }
        } else {
            reply.code(200).send({ items: JSON.parse(cachedItems) });
        }
    } catch (error) {
        reply.code(500).send({ error: 'Fetching items went wrong' });
    }
};

export default { fetchItemsWithTwoMinPrices };
