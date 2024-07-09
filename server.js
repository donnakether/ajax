const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.')) // use static files
app.use(bodyParser.urlencoded({extended : true})) //make object from data submited through form
app.use(bodyParser.json()) //if it comes as json makes object


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('file')

app.post('/upload', (req, res) => {
   upload(req, res, err => {
    if (err) {
        return res.end('Ocorreu um erro.')
    }
    res.end('Concluído com sucesso')
   })
})

app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 7
    })
})

app.get('/parOuImpar', (req, res) => {
    //req.body
    //req.query
    //req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

app.listen(8080, () => console.log('Executando...'))