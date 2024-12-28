import bcrypt from 'bcrypt';
import {randomBytes} from 'crypto';
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js"
import { SessionCollection } from '../db/models/session.js';
import { FIFTEEN_MIN, THIRTY_DAYS } from '../constants/index.js';

const createSession = () => ({
    accessToken: randomBytes(30).toString("base64"),
    refreshToken: randomBytes(30).toString("base64"),
    accessTokenValidUntil: new Date (Date.now() + FIFTEEN_MIN),
    refreshTokenValidUntil: new Date (Date.now() + THIRTY_DAYS),
})

export const registerUser = async(payload) => {
    const user = await UsersCollection.findOne({email: payload.email});
    if(user) throw createHttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(payload.password, 10)

return await UsersCollection.create({
    ...payload,
    password: hashPassword,
});
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({email: payload.email});
    if(!user) throw createHttpError(401, "User not found");

    const passwordCompere = await bcrypt.compare(payload.password, user.password);
    if(!passwordCompere) throw createHttpError(401, "User not found");

    await SessionCollection.deleteOne({userId: user._id});

    const session = createSession();

    return SessionCollection.create({
        userId: user._id,
        ...session,
    })
};

export const refreshSession = async ({refreshToken, sessionId}) => {
    const session = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken,
    });
    if(!session){
        throw createHttpError(401, "Session not found")
    }
    if(Date.now() > session.refreshTokenValidUntil){
        throw createHttpError(401, "Refresh token exipred")
    }

    await SessionCollection.deleteOne({_id: sessionId, refreshToken});

    const newSession = createSession();

    return SessionCollection.create({
        userId: session.userId,
        ...newSession,
    })

};

export const logoutUser = async (sessionId) => {
    await SessionCollection.deleteOne({_id: sessionId});
}
