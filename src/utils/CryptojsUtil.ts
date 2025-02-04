const CryptoJSUtil = require("crypto-js");

export function encrypt(text: string) {
    const SALT = process.env.SALT || "defaultSalt";
    const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
    return cipherText;
}

export function decrypt(cipherText: string) {
    const SALT = process.env.SALT || "defaultSalt";
    const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
    const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
    return originalText;
}