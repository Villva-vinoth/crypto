const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secret = "secret"
const salt = "salt"
const key = crypto.createHash('sha256').update(secret).digest();


const decryption = (data) => {
    try {
        // Split and decode the input
        const [encrypted, iv] = data.split(':');
        const encryptedBuffer = Buffer.from(encrypted, 'base64');
        const ivBuffer = Buffer.from(iv, 'base64');

        // const key = deriveKey(secret, salt);
        // console.log('Encrypted Buffer:', encryptedBuffer);
        // console.log('IV Buffer:', ivBuffer);

        const decrypt = crypto.createDecipheriv(algorithm, key, ivBuffer);

        let decrypted = decrypt.update(encryptedBuffer);
        decrypted = Buffer.concat([decrypted, decrypt.final()]);

        return decrypted.toString('utf-8'); // Convert to string and return
    } catch (error) {
        console.error('Decryption failed:', error.message);
        throw new Error('Invalid decryption');
    }
};


const deriveKey = (passphrase, salt) => {
  // which is same as in derive Key function in frontend 
  return crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256'); // 32 bytes = 256 bits
};

const encryptData = (data) => {
    // Generate a random IV (16 bytes for AES-CBC)
    const iv = crypto.randomBytes(16);

    // Create the cipher using the key and IV


    // const key = deriveKey(secret, salt);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // Encrypt the data
    let encrypted = cipher.update(data, 'utf-8', 'base64');
    encrypted += cipher.final('base64');

    return {
        encryptedData: encrypted,
        iv: iv.toString('base64'), // Encode IV in Base64 for easy transfer
    };
};


module.exports = { decryption ,encryptData };
