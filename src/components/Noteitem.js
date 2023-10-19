import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context=useContext(NoteContext)
  const{deleteNote}=context;
    const {note,updatenote}=props;
  return (
   
        <div class="hey card mx-3 my-3 p-1 bg-dark" style={{width: "18rem"}}>
  <div class="card-body  text-light">

    <div className="d-flex align-item-center">
    <h5 class="card-title flex-grow-1"> {note.title}</h5>
    <i class="fa fa-solid fa-pencil fa-bounce fa-lg p-2" style={{color: "#077413",cursor:'pointer'}} onClick={()=>{
      updatenote(note)
    }}></i>
    <i class="fa fa-regular fa-trash-can fa-fade fa-lg  p-2" style={{color: "#af2c18", cursor:'pointer'}} onClick={()=>{deleteNote(note._id)}}></i>
   
   
    </div>
    <hr></hr>
   
    <p class="card-text"> {note.description} Lorem commodo nulla ipsum eu duis. Elit magna adipisicing minim anim. Id consectetur voluptate cupidatat anim. Qui magna ut labore occaecat anim id sit anim excepteur aliquip commodo consectetur eu cillum.</p>

   <div className='horizontalscroll py-3 bg-dark'>
    <span className='mx-2 hey1 py-1 px-3 text-success bg-dark' style={{borderRadius:'10px'}} >General</span>
    <span className='mx-2 hey1 py-1 px-3 text-success bg-dark' style={{borderRadius:'10px'}} >Important</span>
    <span className='mx-2 hey1 py-1 px-3 text-success bg-dark' style={{borderRadius:'10px'}} >advisable</span>
    <span className='mx-2 hey1 py-1 px-3 text-success bg-dark' style={{borderRadius:'10px'}} >Todo</span>

   </div>
  
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
       
       


  )
}

export default Noteitem