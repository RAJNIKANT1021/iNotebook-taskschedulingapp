const connectTomongo=require('./db');
const express=require('express');
const cors=require('cors');

connectTomongo();
const app=express();
const port=5000;
app.use(cors());
app.use(express.json());//for dealing data in json
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{
    res.send('hello world')

})
app.listen(port,()=>{
    console.log(`app listeninig on port ${port}`)
})