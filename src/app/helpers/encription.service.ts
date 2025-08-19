import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private readonly secretKey =
    '976w8e76rdf68sd7f676wewe7r6w8e76rbwe78rwernwen7nrw6e7r'; // Replace in production

  // Encrypt a string
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  // Decrypt a string
  decrypt(cipherText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error('Decryption error:', err);
      return '';
    }
  }

  // Optional: Encrypt object
  encryptObject(data: object): string {
    return this.encrypt(JSON.stringify(data));
  }

  // Optional: Decrypt to object
  decryptObject(cipherText: string): any {
    const decrypted = this.decrypt(cipherText);
    try {
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }
}
