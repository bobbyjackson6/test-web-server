import { FastifyReply, FastifyRequest } from 'fastify';

interface IReply {
    200: {
        updatedBalance: number;
    };
    500: { error: string };
    400: { message: string };
    404: string;
}
export type PurchaseItemRequest = FastifyRequest<{
    Body: {
        id: number;
        itemName: string;
    };
    Reply: IReply;
}>;

export type PurchaseItemReply = FastifyReply<{
    Reply: IReply;
}>;
