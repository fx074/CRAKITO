const express = require('express')
const fs = require('fs');
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize')
const { randomInt } = require('crypto')

const sequelize = new Sequelize('Crackito', 'root', 'crackito2022',{
    host: 'localhost',
    dialect: 'mariadb',
});

// INIT SEQUELIZE
sequelize.sync({force: true})

const File = sequelize.define(
    'File', {
        ref: {
            type: Sequelize.INTEGER.UNSIGNED,
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
            type: Sequelize.INTEGER.UNSIGNED,
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

async function dlFiles(req, res) {
    let ref = req.params.ref

    // OPTIMISATION POSSIBLE AVEC LES 2 REQUETES 
    try{
        let exists = await File.findAll({
            attributes: ['ref'],
            where: {
                ref: ref,
            },
        })
    } catch(err) {
        console.log(err)
    }
    if(!exists.length){
        res.json(
        {
            file: null,
            filename: null,
            errorHandler: 10,
            errorDesc: 'Aucun fichier à cette adresse'
        })
    } else {
        try{
            let file = await File.findAll({
                where: {
                    ref: ref,
                },
            })
        } catch(err) {
            console.log(err)
        }

        const path_dl = file[0].dataValues.path
        const fileName_dl = file[0].dataValues.path.split('ito/').pop().split('.encr')[0]+'.encr'

        fs.readFile(path_dl, 'utf8', (err, data) => {
            if(err) {
                console.log(err)
                res.json(
                    {
                        file: null,
                        filename: null,
                        errorHandler: 10,
                        errorDesc: err,
                    }
                )
            } 
            res.json(
                {
                    file: data,
                    filename: fileName_dl,
                    errorHandler: 9,
                    errorDesc: null,
                }
            )
        })
    }
}

function uploadFiles(req, res) {
    res.json(
    { 
        message: "Successfully uploaded files",
        ref: g_ref,
    })
}

async function insertDB(filename){
    try{
        await File.create({ref: g_ref, path: '/bdd_crackito/'+filename})
    } catch(err) {
        console.log(err)
    }
}

async function createUniqueRef(){
    let exists = 1
    do{
        g_ref = randomInt(2**32)
        try {
            exists = await File.findAll({
                attributes: ['ref'],
                where: ref = g_ref,
            })
        } catch(err) {
            console.log(err)
        }
    }while(!exists)
}

app.listen(port, () => {
    console.log(`http listening on port ${port}`)
})
