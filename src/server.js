import { json } from "express";
import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import contactRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";


const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express ();


    app.use (json());
    app.use(cors());

    app.use (
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello word!',
        });
    });

    app.use(contactRouter);

    app.use ('*', notFoundHandler);

    app.use (errorHandler);

    app.listen( PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });

};


