//import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root',
// })
// NOTE: Consider changing name from service to _____ and moving to a 'shared' folder
export abstract class CryptoService {
  // constructor() {}

  static encryptAES(data, secretKey) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  static decryptAES(data, secretKey) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
