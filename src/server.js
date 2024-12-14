import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const port = Number(getEnvVar("PORT", 3000));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
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

    app.use(contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});
}
