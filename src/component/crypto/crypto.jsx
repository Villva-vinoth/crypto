import React, { useEffect, useState } from "react";
import { decryptData, derivedKey, encryptData, exportKey1, generateKey, importKey } from "."; // Ensure these utility functions are imported correctly
import axios from "axios";

const Crypto = () => {
  const [data, setData] = useState("");
  const [decrypt, setDecrypt] = useState("");
  const [iv, setIv] = useState("");
  const [exportionKey, setExportedKey] = useState("");
  const [key,setKey] = useState("")
  useEffect(() => {
    const performCryptoOperations = async () => {
      const key_obj = await importKey("secret");
      const exportKey = await exportKey1(key_obj);
      console.log("Exported Key:", exportKey);
      const data = "123";
      setExportedKey(exportKey);
      setKey(key_obj)

      // console.log("Original Data:", data);

      // Encrypt
      const { encryptedData, iv } = await encryptData(key_obj, data);
      // console.log("Encrypted Data:", encryptedData);
      const bu = arrayBufferToBase64(encryptedData);
      setData(bu);
      // console.log("IV:", iv);
      setIv(arrayBufferToBase64(iv));

      // Decrypt
      const decryptedData = await decryptData(key_obj, encryptedData, iv);
      console.log("Decrypted Data:", decryptedData);
      setDecrypt(decryptedData);
    };

    performCryptoOperations();
  }, []); // Empty dependency array ensures the effect runs only once
  function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const [responsedata, setResData] = useState("");

  const handleOnClick = async () => {
    const response = await axios.get(`http://localhost:4005/api/roles`, {
      headers: {
        "x-role-id": data + ":" + iv,
        "x-key":exportionKey
      },
    });
    console.log(response);
    setResData(response.data);
  };

  const [newDecrypt,setNewDecrypt] = useState("")

  const decryptionData = async(params)=>{
    const { encryptedData, iv } = params
    const encodedData = base64ToArrayBuffer(encryptedData)
    const ivEncodedData = base64ToArrayBuffer(iv)
    // console.log("Encrypted Data:", encryptedData,encodedData);
    // console.log("IV:", iv);
    const decryptedData = await decryptData(key, encodedData, ivEncodedData);
    // console.log("Decrypted Data:", decryptedData);
    setNewDecrypt(decryptedData);
  }

  useEffect(() => {
    const decrypt = async ()=>{
      await decryptionData(responsedata.encryptedData)
    }
   if(responsedata){
    decrypt()
   }
  },[responsedata])

  return (
    <div>
      {"frondend Encrypt :" +data}
      <br />
      {"Front end Decrypt :"+decrypt}
      <br />
      <button onClick={handleOnClick}>Click</button>
      <br />
      {responsedata && "backend response decryption :" +responsedata.decryption}
      <br />
      {responsedata && "backend response encryption :"+responsedata.encryptedData.encryptedData}
      <br />
      {responsedata && "Front end Decrypt with response :"+newDecrypt}
    </div>
  );
};

export default Crypto;
