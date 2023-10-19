const mongoose=require('mongoose');
const {Schema}=mongoose;
//creating schemas using moongose

const UserSchema=new Schema({
    user:{
        //like foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    },

})
//this is to export schemas model at first is model name then schema;
module.exports=mongoose.model('Notes',UserSchema);