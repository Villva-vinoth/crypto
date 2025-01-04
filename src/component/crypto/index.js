async function generateKey() {
    return await crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: 256, // Key length
        },
        true, // Extractable key
        ["encrypt", "decrypt"]
    );
}


async function importKey(key) {
    const encoded = new TextEncoder()
    const hash = await crypto.subtle.digest('sha-256',encoded.encode(key))
    return await crypto.subtle.importKey(
        "raw",
        hash,
        { name:"AES-CBC"},
        true,
        ["encrypt", "decrypt"]
    )
}

async function derivedKey(data) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw",
        encoder.encode(data),
        "PBKDF2",
        false,
        ["deriveKey"]
    )
    const key = await crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: encoder.encode("salt"),
        iterations: 100000,
        hash: "SHA-256",
    },
    keyMaterial,
    {
        name: "AES-CBC",
        length: 256, 
    },
    true,
    ["encrypt", "decrypt"]
)
return key
}
async function exportKey1(key) {
    const exportedKey = await crypto.subtle.exportKey("raw", key); // Export the key as raw bytes
    return btoa(String.fromCharCode(...new Uint8Array(exportedKey))); // Convert to Base64 string
}
async function encryptData(key, data) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(16)); // IV must be 16 bytes for AES-CBC
    const encodedData = encoder.encode(data);

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        encodedData
    );

    return {
        encryptedData: new Uint8Array(encrypted),
        iv,
    };
}

async function decryptData(key, encryptedData, iv) {

    const decrypted = await crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}



export { generateKey, encryptData, decryptData, exportKey1,derivedKey, importKey};
    