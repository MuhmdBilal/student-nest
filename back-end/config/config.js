const mongoose = require('mongoose');
require("dotenv").config();
let url = process.env.MONGODB_LINK
mongoose.set('strictQuery', false);
mongoose.connect(url, {   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err));

