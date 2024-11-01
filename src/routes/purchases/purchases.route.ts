import { FastifyInstance } from 'fastify';
import purchasesController from '../../controllers/purchases.controller.js';

const purchasesRouter = async (app: FastifyInstance) => {
    app.post('/purchase_item', purchasesController.purchaseItem);
};

export default purchasesRouter;
