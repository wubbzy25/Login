const express = require('express');
const app = express();
const home = require('./routes/router');
const puerto = 3000;
const bodyParser = require('body-parser');
const main = require('./database/db')
main;

//static files
app.use(express.static(__dirname + '/public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routes
app.use('/', home);

//middlewares

//iniciar la web
app.listen(puerto, () =>{   
console.log('Pagina web iniciada correctamente http://localhost:3000/login')  
});

    

