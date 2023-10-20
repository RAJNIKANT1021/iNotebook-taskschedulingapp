//database connection
const mongoose= require('mongoose');
const mongoURI="mongodb+srv://rajnikant1021:Rk8289315@cluster0.oux03qy.mongodb.net/?retryWrites=true&w=majority";


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