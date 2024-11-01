import { FastifyInstance } from 'fastify';
import itemsController from '../../controllers/items.controller.js';
import { FetchItemsWithTwoMinPricesReply } from '../../types/items/items.controller.types.js';

const itemsRouter = async (app: FastifyInstance) => {
    app.get('/items', (_, reply: FetchItemsWithTwoMinPricesReply) =>
        itemsController.fetchItemsWithTwoMinPrices(app, reply),
    );
};

export default itemsRouter;
