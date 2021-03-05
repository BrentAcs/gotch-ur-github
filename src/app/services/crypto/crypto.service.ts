import * as CryptoJS from 'crypto-js';

// TODO: address this crypto.service.ts depends on 'crypto-js'. CommonJS or AMD dependencies can cause optimization bailouts.
export class CryptoService {
  constructor() {}

  static encryptAES(data, secretKey) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (e) {
      console.error(e);
    }
  }

  static decryptAES(data, secretKey) {
    try {
      console.log('CryptoService, data:');
      console.log(data);
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
