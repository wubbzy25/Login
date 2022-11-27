const mongoose = require('mongoose')
const url = 'mongodb+srv://Wuubzi:DWwVpMrwGArnGo9G@cluster0.niyghz9.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
  useNewUrlParser: true,
}).then(()=>{
  console.log('Me He Conectado Correctamente a la base de dato')
}).catch((error)=>{
  console.log(error)
})

