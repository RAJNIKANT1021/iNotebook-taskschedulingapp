//database connection
const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";


const connectToMongo=()=>{

    mongoose.connect(mongoURI,()=>{
        try{
            console.log('connected to mongo successfully')
        }catch{
            console.log('error')

        }
        


    })

}
module.exports=connectToMongo;