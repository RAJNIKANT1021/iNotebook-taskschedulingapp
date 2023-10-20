const express=require("express");
const router=express.Router();
const Notes=require('../models/Notes');
const fetchuser = require("../middleware/fetchuser");
const {body,validationResult}=require('express-validator');


//get all the notes
router.get("/fetchallnotes",fetchuser,async(req,res)=>{
    // let obj={name:'hey'};
    let success=false;
    try{
        const notes=await Notes.find({user:req.user.id})
        success=true;
        res.json({success,notes});

    } catch (err) {
      console.log(err.message);
    return   res.status(500).json({success,error:"Some internal error has occured. "})
    }
  

})


//add a new  notes using post
router.post("/addnote",fetchuser,  [
    body("title", "Enter a Title of minimum 3 length").isLength({ min: 3 }),
  
    body("description", "Description should atleast 5 characters").isLength({
      min: 5
    }),
  ],async(req,res)=>{
    let success=false;
    // let obj={name:'hey'};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const notes=await note.save();
        success=true;
        res.status(200).json({success,notes});

       
    } catch (err) {
      console.log(err.message);
   return   res.status(500).json({success,error:"Some internal error has occured. "})
    }
  

})
//update note
router.put("/updatenote/:id",fetchuser,async(req,res)=>{
    // let obj={name:'hey'};
   let success=false;
    try{
        const {title,description,tag}=req.body;
        const newnote={};
        
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
      
       
        //find the note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){
            res.json({success,error:"The corrresponding note is not found in the database."})
        }
        if(note.user.toString()!==req.user.id){
            if(!note){
            return    res.json({success,error:"This operation is not allowed.mismatched IDs"})
            }

        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        success=true;
        res.json({success,note});

       
    } catch (err) {
      console.log(err.message);
    return   res.status(500).json({success,error:"Some internal error has occured. "})
    }
  

})


//delete node
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
    // let obj={name:'hey'};
    let success=false;
   
    try{
        
       
        //find the note to be updated and update it
        let note=await Notes.findById(req.params.id);
      
        if(note.user.toString()!==req.user.id){
           
                return res.json({success,error:"This operation is not allowed.mismatched IDs"})
            }

        
        note=await Notes.findByIdAndDelete(req.params.id)
       
        // res.json({note});
        success=true; 
        return  res.status(200).json({success,msg:"Note has been deleted successfully"})


       
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({success,error:"Some internal error has occured. "})
    }
  

})




module.exports=router