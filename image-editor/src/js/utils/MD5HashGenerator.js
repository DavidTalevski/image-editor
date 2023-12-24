import CryptoJS from "crypto-js";

export default class MD5HashGenerator {
  generateMD5Hash(data) {
    try {
      const hash = CryptoJS.MD5(data).toString();
      return hash;
    } catch (error) {
      console.error('Error generating MD5 hash:', error);
      throw error;
    }
  }
}