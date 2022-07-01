const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3000;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/bdd_crackito')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(file.fieldname + ".encr");
    },
})
const upload = multer({ storage: storage })

app.post('/upload', upload.any(), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.file, req.body)
    res.json({ message: "Successfully uploaded files" })
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
