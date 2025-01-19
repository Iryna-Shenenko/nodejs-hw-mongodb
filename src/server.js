import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from "./services/contacts.js";

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
    const app = express ();


    app.use (express.json());
    app.use(cors());

    app.use (
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.get('/contacts', async (req, res) => {
        const response = await getAllContacts();

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: response,
        });
    });

    app.get('/contacts/:contactId', async(req, res, next) => {
        const {contactId} = req.params;
        const response = await getContactById(contactId);
        if (!response){
            res.status(404).json({
                status: 404,
                message: 'Contact not found',
            });
            return;
        }

        res.json({
            status: 200,
            message:  `Successfully found contact with id ${contactId}!`,
            data: response,
        });
    });

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello word!',
        });
    });
    app.use ('*', (req, res, next) => {
        res.status(404).json ({
            message: 'Not found',
        });
    });

    app.use ((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,

        });
    });

    app.listen( PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });

};


