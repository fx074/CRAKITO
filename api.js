const express = require('express')
const multer = require('multer')
const path = require('path')
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
var cors = require('cors');
const { randomInt } = require('crypto');

const sequelize = new Sequelize('Crackito', 'root', 'crackito2022',{
    host: 'localhost',
    dialect: 'mariadb',
});

// INIT SEQUELIZE
sequelize.sync()

const File = sequelize.define(
    'File', {
        ref: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
        },
        path: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        IP: {
            type: Sequelize.INTEGER(4).UNSIGNED,
        }
    }
)
const F_Key = sequelize.define(
    'F_Key', {
        ref: {
            type: Sequelize.INTEGER(15),
            references: {
                model: File,
                key: 'ref'
            }
        },
        F_Hash: {
            type: Sequelize.STRING(255),
            allowNull: false,
        }
    }
)

const app = express()
app.use(bodyParser.json())
app.use(cors()) 

const port = 3000;
let g_ref = null;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/bdd_crackito')
    },
    filename: function(req, file, cb) {
        const date = Date.now()
        const filename = file.originalname + date
        createUniqueRef()
        insertDB(filename);
        cb(null, filename);
    },
})
const upload = multer({ storage: storage })

app.post('/upload', upload.any(), uploadFiles);

app.get('/download/file/:ref', dlFiles);

function dlFiles(req, res) {
    console.log(req.params.ref)
    res.json(
    {
        file: "file",
        filename: "test.test",
    })
}

function uploadFiles(req, res) {
    res.json(
    { 
        message: "Successfully uploaded files",
        ref: g_ref,
    })
}

function insertDB(filename){
    File.create({ref: g_ref, path: '/bdd_crackito/'+filename})
}

async function createUniqueRef(){
    let exists = 1
    do{
        g_ref = randomInt(2**32)
        exists = await File.findAll({
            attributes: ['ref'],
            where: ref = g_ref,
        })
    }while(!exists)
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
