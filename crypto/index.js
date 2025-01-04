const express = require('express')
const cors = require('cors')
const app = express()
const {decryption, encryptData} = require('./crypto')
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/roles', (req, res) => {

    try {
    const xROleId = req.headers['x-role-id']
    const decode = decryption(xROleId)
    const encoded = encryptData(decode)
    res.send({
        encryptedData: encoded,
        decryption: decode
    })
    } catch (error) {
        res.send(error.message)
    }
})
app.listen(4005, () => {
    console.log('app listening on port 4005!')
})