
import React, { useContext, useEffect ,useRef} from 'react'
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context=useContext(NoteContext);
    const {notes,setnotes,getnotes}=context;

    useEffect(() => {
      getnotes();
     
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ref = useRef(null);
    const updatenote=(note)=>{
      ref.current.click();

    }
  
  return (
    <>
  
<button type="button" class="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" data-bs-theme="dark"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-light" id="exampleModalLabel">Update a record</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-light">
      <div className='hey my-3 p-3 bg-dark align-items-center'>
    
   
           
            <form class="mx-4 align-items-center justify-content-center ">
      <div class="row mb-3">
        <label for="title" class="form-label">Title</label>
        <div class="col-s-10">
          <input type="text" class="form-control bg-dark text-light" id="title" name="title" onChange={updatenote}/>
        </div>
      </div>

      <div class="row mb-3">
        <label for="description"class="form-label">Description</label>
        <div class="col-s-10">
        <textarea rows="5" cols="33"  id="desc" name="description" class="form-control bg-dark text-light" onChange={updatenote} />
        </div>
      </div>
      <div class="row mb-3">
        <label for="title" class="form-label">Tags</label>
        <div class="col-s-10">
          <input type="text" class="form-control bg-dark text-light" id="title" name="title" onChange={updatenote}/>
        </div>
      </div>
    
      <button type="submit" class="btn btn-success " onClick={updatenote}>Update a Record</button>
    </form>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  


    <div className='row my-3'>
          <h2>
          Your Notes
        </h2>
       
        
        
        {
       notes && notes.map((note)=>{
          return <Noteitem note={note} updatenote={updatenote}/>
        })
      }</div>
      </>
  )
}

export default Notes