const express = require("express");
const hbs = require("express-handlebars");
const mongodb = require("mongodb");
const http = require("http");



//Creo las variables
let db , urlMongo , usuarios , mensajes , posts , comentarios ;

const app = express();
const motor = hbs.create({
    defaultLayout:'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname:'.hbs'
});

app.engine(".hbs",motor.engine);
app.set("view engine",".hbs");
app.use(express.static('public')); //seteo que los archivos estáticos los tengo en la carpeta 'public'

//Seteo las paginas a dirigirse
let misValores;
app.get('/', (req,res)=>{
    res.render("home");
});
app.get('/home', (req,res)=>{
    res.render("home");
});

app.get('/perfil', (req,res)=>{
    res.render("perfil");
});
app.get('/contacto', (req,res)=>{
    res.render("contacto");
});




//Creo la conexión al cliente de Mongo
const MongoClient = mongodb.MongoClient;

urlMongo = "mongodb://localhost:27017";


MongoClient.connect(urlMongo , (err,client)=>{

    if (err) { console.log('Ha ocurrido un error') };

    //Trabajo con la base de datos
    db = client.db('EjercicioMongo');

    usuarios = db.collection('usuarios');
    mensajes = db.collection('mensajes');
    posts = db.collection('posts');
    comentarios = db.collection('comentarios');

    app.listen(8080, ()=>{ console.log('Servidor corriendo en el puerto 8080')});
})



