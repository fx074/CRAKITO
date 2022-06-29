const express = require('express')
const multer = require('multer')
const req = require("express/lib/request")
const res = require("express/lib/response")
const path = require('path')
var cors = require('cors');

const app = express()
app.use(cors())

const port = 80;

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, 'test/test.html'))
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'/files'))
    },
})
const upload = multer({ storage: storage })

app.post('/Upload', upload.any(), function(req, res, next){
    res.sendFile(path.join(__dirname, 'test/validation.html'))
})

app.listen(80, () => {
    console.log(`http listening on port ${port}`)
})
