import { TokenResponse } from "./TokenResponse";

export type TokenDecoded = {
    TokenClaim: string;
    UserInfo: string;
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    nbf: number;
}