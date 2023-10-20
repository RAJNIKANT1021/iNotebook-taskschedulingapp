import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context=useContext(NoteContext)
  const{deleteNote}=context;
    const {note,updatenote}=props;
    const{showAlert}=props;
  return (
   
        <div className="hey card mx-auto my-4  p-1 bg-dark" style={{width: "18rem", minMarginRight:'10px'}}>
  <div className="card-body  text-light">

    <div className="d-flex align-item-center">
    <h5 className="card-title flex-grow-1"> {note.title}</h5>
    <i className="fa fa-solid fa-pencil fa-bounce fa-lg p-2" style={{color: "#077413",cursor:'pointer'}} onClick={()=>{
      updatenote(note,showAlert)
    }}></i>
    <i className="fa fa-regular fa-trash-can fa-fade fa-lg  p-2" style={{color: "#af2c18", cursor:'pointer'}} onClick={()=>{deleteNote(note._id,showAlert)}}></i>
   
   
    </div>
    <hr></hr>
   
    <p className="card-text"> {note.description}</p>
  

   <div className='horizontalscroll py-3 bg-dark'>
   {
      note && note.tag && note.tag.split(",").map((val,i)=>
    
        <span className='mx-2 hey1 py-1 px-3 text-success bg-dark' key={`${i}${val.trim()}`} style={{borderRadius:'10px'}} >{val.trim()}</span>
      
    
      

      
      )
    }


   </div>
  
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
       
       


  )
}

export default Noteitem