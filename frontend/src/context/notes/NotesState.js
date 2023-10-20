import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  


  const host="https://notebookapi-rho.vercel.app"
  
      const [notes,setnotes]=useState([])

      const getnotes=async()=>{
        try{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
          },
        
         
          });
          const json=await response.json();
        setnotes(json.notes);
      }catch(err){
        console.log(err);
      }

      }
   

      //addNote
      const addNote=async (title,description,tag,showAlert)=>{

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
          },
          body: JSON.stringify({title,description,tag})
         
          });
          const note=await response.json();
          if(note.success){
            showAlert("Your note has beed added successfully",'success')
                    }else{
                      if(Array.isArray(note.errors)){
                        showAlert(note.errors[0].msg,'danger')
              
                      }else
                      showAlert(note.error,'danger')
                      return;
                      
                    }
            
     
        setnotes(notes.concat(note.notes))

        

      }


      //delete a node
      const deleteNote=async(id,showAlert)=>{
        try{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
          },
       
         
          });
        
       
          const json=await response.json();
        
          if(json.success){
            showAlert("Your note has beed deleted successfully",'success')
                    }else{
                     
                      showAlert(json.error,'danger')
                      return;
                      
                    }
         const x=notes.filter((mp)=>{return mp._id!==id });
setnotes(x);
         
        }

  catch(err){
    console.log(err)

  }

       
        
      }

      
      const editNote=async(id,title,description,tag,showAlert)=>{
        if(title.length<3 || description.length<3 || tag.length<3){
          showAlert("Fulfill the length criteria of Title,Description and Tags",'danger')
          return;
        }
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
          },
          body: JSON.stringify({title,description,tag})
         
          });

let newnotes=JSON.parse(JSON.stringify(notes))//making deep copy

const json=await response.json();
console.log(json)
if(json.success){
  showAlert("Your note has beed updated successfully",'success')
          }else{
           
            if(Array.isArray(json.errors)){
              showAlert(json.errors[0].msg,'danger')
    
            }else
            showAlert(json.error,'danger')
          
               
            return;
            
          }


          for (let i = 0; i < newnotes.length; i++) {
            const element = newnotes[i];
            if(element._id===id){
              element.title=title;
              element.description=description;
              element.tag=tag;
              break;
            }
            
          }
       
          setnotes(newnotes)
        
          

          
        }
          
        // API Call
        
     

        
      

      //edit a node

      
   
    return (
        <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,editNote,getnotes}}>
            {props.children}


        </NoteContext.Provider>




    )

}
export default NoteState;