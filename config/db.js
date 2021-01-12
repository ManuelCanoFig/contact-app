const mongoose = require('mongoose');

//Accesing to config
const config = require('config');
//Calling the mongoURI from the dafaul.json file
const db = config.get('mongoURI');

const connectDB = async() =>{
   try {
      await mongoose.connect(db,{
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      console.log('MongoDB Connected');
   } catch (err) {
       console.error(err.message);
       process.exit(1);
   }
}

module.exports = connectDB;