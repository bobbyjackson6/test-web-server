import fastify, { FastifyServerOptions } from 'fastify';
import userRouter from '../routes/user/user.route.js';
import pool from '../config/db.js';
import itemsRouter from '../routes/items/items.route.js';
import fastifyRedis from '@fastify/redis';
import purchasesRouter from '../routes/purchases/purchases.route.js';

const App = (options: FastifyServerOptions) => {
    const app = fastify(options);

    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Error connecting to the database', err.stack);
        } else {
            console.log('Connected to the database:', res.rows);
        }
    });

    app.register(fastifyRedis);

    app.register(userRouter);
    app.register(itemsRouter);
    app.register(purchasesRouter);

    return app;
};

export default App;
