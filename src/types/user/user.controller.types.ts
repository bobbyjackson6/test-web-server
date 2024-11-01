import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify/types/reply.js';

interface IReply {
    200: { success: boolean };
    401: { error: string };
    500: { error: string };
}

export type LoginUserRequest = FastifyRequest<{
    Body: {
        id: string;
        password: string;
    };
    Reply: IReply;
}>;

export type LoginUserResponse = FastifyReply<{
    Reply: IReply;
}>;

export type EditPasswordUserRequest = FastifyRequest<{
    Body: {
        id: number;
        newPassword: string;
    };
    Reply: IReply;
}>;

export type EditPasswordResponse = FastifyReply<{
    Reply: IReply;
}>;
