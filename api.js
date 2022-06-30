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

app.post('/upload', upload.any(), function(req, res, next){
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
