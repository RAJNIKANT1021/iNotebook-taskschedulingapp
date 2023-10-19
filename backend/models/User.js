const mongoose=require('mongoose');
const {Schema}=mongoose;
//creating schemas using moongose

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

})
//this is to export schemas model at first is model name then schema;
const User=mongoose.model('user',UserSchema);

module.exports=User;