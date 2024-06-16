const mongoose=require('mongoose');

module.exports=(cb)=>{

mongoose.connect(process.env.URI);
cb();
}


