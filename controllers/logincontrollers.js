//require the collection
const usuarios = require('../database/schemas/usuarios');
const bcrypt = require('bcrypt')

function index(req, res){
    res.render('../views/login.ejs', {error: false});
};

async function register(req, res){
    //variables register
    const username = req.body.username;
    const gmail = req.body.gmail;
    let password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    //variables login
    const datos = req.body
    //query 
    const existe_usuario = await usuarios.findOne({username: username})
    const gmail_existe = await usuarios.findOne({gmail: gmail});
    //if the json send 4 inputs value
    if(username && gmail && password && confirmpassword ){
    //validate if the same password 
    if(password != confirmpassword){
      res.render('../views/login.ejs', {error: '❌ Passwords do not match'});
    }
     //if the user exist
    if(existe_usuario){
        res.render('../views/login.ejs', {error: '❌ User Already Register'});
        //if the gmail exist
      }else if (gmail_existe){
        res.render('../views/login.ejs', {error: '❌ Gmail Already Register'});
          //if user and gmail don't exist
      }else{
          //encript the password
         bcrypt.hash(password, 12).then(async hash =>{
          let  hashpassword = hash
          //save the dates
        const nuevouser = new usuarios({
            username: username,
            gmail: gmail,
            password: hashpassword,
           })
           res.send("Registrado correctamente")
          return await nuevouser.save();
    });
    };
    //if json send two inputs value
  }else{
      //query
    const existe_usuario2 = await usuarios.findOne({username: datos.useroremail})
    //if the user dont register
    if(!existe_usuario2){
      res.render('../views/login.ejs', {error: '❌ The user is not registered'});
      return;
    }
      //compare passwords to validate that they are the same
    bcrypt.compare(datos.contraseña, existe_usuario2.password, (err, isMatch) =>{
    //If it's not the same
      if(!isMatch){
        res.render('../views/login.ejs', {error: '❌ The password is not correct'});
          //if they are the same
      }else{
        res.send("Logeado Correctamente")
      }
     })

  }
}
  
module.exports = ({
    index,
    register,
}); 
