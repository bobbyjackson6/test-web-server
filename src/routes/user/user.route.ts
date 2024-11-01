import { FastifyInstance } from 'fastify';
import userController from '../../controllers/user.controller.js';

const userRouter = async (app: FastifyInstance) => {
    app.post('/login', userController.loginUser);
    app.post('/edit_password', userController.editPassword);
};

export default userRouter;
