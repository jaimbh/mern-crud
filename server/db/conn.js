const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=> console.log('db connected')).catch((e)=> console.error(e));