import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const port = Number(getEnvVar("PORT", 3000));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
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

    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});
}
