const express = require('express')
const multer = require('multer')
const path = require('path')
var cors = require('cors');

const app = express()
app.use(cors())

const port = 3000;

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, 'test/test.html'))
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'/files'))
    },
})
const upload = multer({ storage: storage })

app.post('/test', (req, res) => {
    res.send('test');
})

app.post('/upload', uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
