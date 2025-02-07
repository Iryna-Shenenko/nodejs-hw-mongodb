import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import { randomBytes} from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY, } from "../contacts/index.js";
import { SessionsCollection } from "../db/models/session.js";
// import jwt from 'jsonwebtoken';
// import { getEnvVar } from "../utils/getEnvVar.js";
// import { sendEmail } from "../utils/sendMail.js";
// import { SMTP } from "../contacts/index.js";




export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({email: payload.email});
    if(user) throw createHttpError (409, 'Email in use');


    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({email: payload.email});
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(payload.password, user.password);

    if (!isEqual){
        throw createHttpError(401, 'Unauthorized');
    }
    await SessionsCollection.deleteOne({userId: user._id});

    const newSession = createSession();

    return await SessionsCollection.create({
        userId: user._id,
        ...newSession,
    });
};

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId});
};

const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date (Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date (Date.now() + ONE_DAY),
    };
};

export const refreshUserSession = async ({ sessionId, refreshToken}) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if(!session) {
        throw createHttpError(401, 'Session not found');
    }
    const isSessionTokenExpired = new Date() > new Date (session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');
    }
    const newSession = createSession();

    await SessionsCollection.deleteOne ({ _id: sessionId, refreshToken});

    return await SessionsCollection.create({
        userId: session.userId,
        ...newSession,
    });
};

// export const requestResetToken = async (email) => {
//     const user = await UsersCollection.findOne({email});
//     if (!user) {
//         throw createHttpError(404, 'User not found');
//     }
//     const resetToken = jwt.sign(
//         {
//             sub: user._id,
//             email,
//         },
//         getEnvVar('JWT_SECRET'),
//         {expiresIn: '15m',},
//     );
//     await sendEmail({
//         from: getEnvVar(SMTP.SMTP_FROM),
//         to: email,
//         subject: 'Reset your password',
//         html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
//     });
// };
