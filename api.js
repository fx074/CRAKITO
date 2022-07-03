const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3000;
const ref = null;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/bdd_crackito')
    },
    filename: function(req, file, cb) {
        const date = Date.now()
        const filename = file.originalname + date
        
        addDataBase(filename);
        cb(null, filename);
    },
})
const upload = multer({ storage: storage })

app.post('/upload', upload.any(), uploadFiles);

function uploadFiles(req, res) {
    res.json(
    { 
        message: "Successfully uploaded files",
        ref: ref.toString(),
    })
}

function addDataBase(filename){
    return filename
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
