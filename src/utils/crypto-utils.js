import CryptoJS from "crypto-js";

var urlEncode = (input) => input.replaceAll('+', '.').replaceAll('/', '_').replaceAll('=', '-')
var urlDecode = (input) => input.replaceAll('.', '+').replaceAll('_', '/').replaceAll('-', '=')

export default {
    encrypt(value, secret) {
        let encryptedStringHex = CryptoJS.AES.encrypt(value, secret).toString();
        return urlEncode(encryptedStringHex);
    },
    decrypt(value, secret) {
        let decryptedStringHex = CryptoJS.AES.decrypt(urlDecode(value), secret);
        return decryptedStringHex.toString(CryptoJS.enc.Utf8);
    }
}
