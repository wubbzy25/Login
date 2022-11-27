const usuarios = require('../database/schemas/usuarios');
const bcrypt = require('bcrypt')

function index(req, res){
    res.render('../views/login.ejs', {error: false});
};

async function register(req, res){
    //varables register
    const username = req.body.username;
    const gmail = req.body.gmail;
    let password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    //variables login
    const datos = req.body
    //query 
    const existe_usuario = await usuarios.findOne({username: username})
    const gmail_existe = await usuarios.findOne({gmail: gmail});
    //login
    if(username && gmail && password && confirmpassword ){
    if(password != confirmpassword){
      res.render('../views/login.ejs', {error: '❌ Passwords do not match'});
    }
    if(existe_usuario){
        res.render('../views/login.ejs', {error: '❌ User Already Register'});
      }else if (gmail_existe){
        res.render('../views/login.ejs', {error: '❌ Gmail Already Register'});
      }else{
         bcrypt.hash(password, 12).then(async hash =>{
          let  hashpassword = hash
        const nuevouser = new usuarios({
            username: username,
            gmail: gmail,
            password: hashpassword,
           })
           res.send("Registrado correctamente")
          return await nuevouser.save();
    });
    };
  }else{
    const existe_usuario2 = await usuarios.findOne({username: datos.useroremail})
    if(!existe_usuario2){
      res.render('../views/login.ejs', {error: '❌ The user is not registered'});
      return;
    }
    bcrypt.compare(datos.contraseña, existe_usuario2.password, (err, isMatch) =>{
      if(!isMatch){
        res.render('../views/login.ejs', {error: '❌ The password is not correct'});
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