
import { SessionOptions } from "iron-session";

export interface SessionData {
    user?: {
        email: string;
        isLoggedIn: boolean;
    };
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "prospera_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
    },
};
