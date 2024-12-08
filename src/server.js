import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { getContacts } from "./services/contacts.js";
import { getContactById } from "./services/contacts.js";

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(
        pino({
            transport: {
                target: "pino-pretty"
            }
        })
    );

    app.get("/", (req, res) => {
        res.json({
            message: 'Hello world!',
          });
    });

    app.get("/contacts", async (req, res) => {
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        })
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const {contactId} = req.params;
        const data = await getContactById(contactId);

        if(!data) {
            res.status(404).json({
                status: 404,
                message: 'Contact not found',
            })
            return;
        }
        res.json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data,
        })
    })

    app.get((req, res) => {
        res.status(404).json({
            message: 'Not found',
        })
    })

    const port = Number(getEnvVar("PORT", 3000));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});
}
