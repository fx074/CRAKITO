const express = require('express')
const multer = require('multer')
const req = require("express/lib/request")
const res = require("express/lib/response")
const path = require('path')

const app = express()

const port = 3000;

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, 'test/test.html'))
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'/Files'))
    },
})
const upload = multer({ storage: storage })

app.post('/Upload', upload.any(), function(req, res, next){
    res.sendFile(path.join(__dirname, 'test/validation.html'))
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
