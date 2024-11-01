import pool from '../config/db.js';
import { editPasswordQuery, loginUserQuery } from '../queries/user.queries.js';
import {
    EditPasswordResponse,
    EditPasswordUserRequest,
    LoginUserRequest,
    LoginUserResponse,
} from '../types/user/user.controller.types.js';

export const loginUser = (req: LoginUserRequest, reply: LoginUserResponse) => {
    const { id, password } = req.body;
    pool.query({ text: loginUserQuery, values: [id] }, (err, res) => {
        if (err) {
            reply.code(500).send({ error: err.message });
        } else {
            const user = res.rows[0];
            if (user && res.rows[0].password === password) {
                reply.code(200).send({ success: true });
            } else {
                reply.code(401).send({ error: 'Password is wrong' });
            }
        }
    });
};

export const editPassword = (req: EditPasswordUserRequest, reply: EditPasswordResponse) => {
    const { id, newPassword } = req.body;
    pool.query({ text: editPasswordQuery, values: [newPassword, id] }, (err, res) => {
        if (err) {
            reply.code(500).send({ error: err.message });
        } else {
            reply.code(200).send({ success: true });
        }
    });
};

export default { loginUser, editPassword };
