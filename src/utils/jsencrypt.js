import {JSEncrypt} from 'jsencrypt';
//加密
export function encryptedData(publicKey, data) {
    let encryptor = new JSEncrypt({default_key_size: 2048});
    /*此处可以指定公钥的编码，也可以不指定*/
    encryptor.setPublicKey(publicKey, "base64");
    return encryptor.encrypt(data);
}

//解密
export function decryptData(privateKey, data) {
    let decrypt = new JSEncrypt({default_key_size: 2048});
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(data);
}