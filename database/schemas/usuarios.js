const {Schema, model } = require('mongoose')

const usuarios = new Schema({
        username: {type: String},
        gmail: {type: String},
        password: {type: String}
   
})


module.exports = model("usuarios", usuarios)