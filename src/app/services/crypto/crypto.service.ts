import * as CryptoJS from 'crypto-js';

// TODO: address this crypto.service.ts depends on 'crypto-js'. CommonJS or AMD dependencies can cause optimization bailouts.
export class CryptoService {
  private static _key = CryptoJS.enc.Utf8.parse('8080808080808080');
  private static _iv = CryptoJS.enc.Utf8.parse('8080808080808080');

  constructor() {}

  static encryptAES(data, secretKey) {
    const encryptedLogin = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(data),
      CryptoService._key,
      {
        keySize: 128 / 8,
        iv: CryptoService._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encryptedLogin.toString();
  }

  static decryptAES(data, secretKey) {
    const decryptedlogin = CryptoJS.enc.Utf8.stringify(
      CryptoJS.AES.decrypt(data.toString(), CryptoService._key, {
        keySize: 128 / 8,
        iv: CryptoService._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
    );
    return decryptedlogin;
  }
}
