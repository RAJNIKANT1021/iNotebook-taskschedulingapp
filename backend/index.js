const connectTomongo=require('./db');
const express=require('express');
const cors=require('cors');

connectTomongo();
const app=express();
const port=5000;
app.use(cors (
    {
    origin: ["https://notebookapi-rho.vercel.app"],
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true
    }
    
    ));
app.use(express.json());//for dealing data in json
//available routes
// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("frontend/build"));
// }
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{
    res.send('hello world')

})
app.listen(port,()=>{
    console.log(`app listeninig on port ${port}`)
})