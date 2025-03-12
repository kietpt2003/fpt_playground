import CryptoJS from "crypto-js";
import { env } from "../constants/environmentVariables";

export function encryptMessage(message: string, id: string) {
    return CryptoJS.AES.encrypt(message, generateMessageKey(id)).toString();
}

export function decryptMessage(ciphertext: string, id: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, generateMessageKey(id));
    return bytes.toString(CryptoJS.enc.Utf8);
}

const generateMessageKey = (id: string) => {
    return CryptoJS.SHA256(id + env.MESSAGE_KEY).toString();
};