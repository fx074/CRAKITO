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
        cb(null, path.join(__dirname,'/files'))
    },
})
const upload = multer({ dest: "files/" })

app.post('/test', (req, res) => {
    res.send('test');
})

app.post('/upload', uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body)
    res.json({ message: "Successfully uploaded files" })
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
