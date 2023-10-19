import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
  
      const [notes,setnotes]=useState([])

      const getnotes=async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGNjZjM0NDJjNDUwNzA0ZmNhNmY1In0sImlhdCI6MTY5NzY5NzAxMX0.80rpVJ9D8QI8OMGJEZqJ-8GqRZKBlbgJCH5l36Uy0WE'
          },
        
         
          });
          const json=await response.json();
        setnotes(json);

      }

      //addNote
      const addNote=async (title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGNjZjM0NDJjNDUwNzA0ZmNhNmY1In0sImlhdCI6MTY5NzY5NzAxMX0.80rpVJ9D8QI8OMGJEZqJ-8GqRZKBlbgJCH5l36Uy0WE'
          },
          body: JSON.stringify({title,description,tag})
         
          });
       const note= {
          "_id": "6530e6ba5c888b7a50ec2c16",
          "user": "6530ccf3442c450704fca6f5",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-10-19T08:20:10.042Z",
          "__v": 0
        };
        setnotes(notes.concat(note))

      }


      //delete a node
      const deleteNote=async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGNjZjM0NDJjNDUwNzA0ZmNhNmY1In0sImlhdCI6MTY5NzY5NzAxMX0.80rpVJ9D8QI8OMGJEZqJ-8GqRZKBlbgJCH5l36Uy0WE'
          },
       
         
          });
          const json=response.json();
          console.log(json);
       
        
      }

      
      const editNote=async(id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGNjZjM0NDJjNDUwNzA0ZmNhNmY1In0sImlhdCI6MTY5NzY5NzAxMX0.80rpVJ9D8QI8OMGJEZqJ-8GqRZKBlbgJCH5l36Uy0WE'
          },
          body: JSON.stringify({title,description,tag})
         
          });

          for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if(element._id===id){
              element.title=title;
              element.description=description;
              element.tag=tag;
              return
            }
            
          }
        
          

          
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