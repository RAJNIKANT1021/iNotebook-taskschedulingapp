import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = ({showAlert}) => {
  const Navigate=useNavigate();
  const context = useContext(NoteContext);
  const { notes, getnotes,editNote } = context;
  const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:""})

  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }else{
      Navigate('/login')
    }
  


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);
  const updatenote = (note) => {
    ref.current.click();
    setnote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
  };
  const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})

  }
  const handleclick=async(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag,showAlert)
    ref.current.click();


  }
  

  return (
    <>
      <button
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        data-bs-theme="dark"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">
                Update a record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-light">
              <div className="hey my-3 p-3 bg-dark align-items-center">
                <form className="mx-4 align-items-center justify-content-center ">
                  <div className="row mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <div className="col-s-10">
                      <input
                    
                        type="text"
                        className="form-control bg-dark text-light"
                        id="title"
                        name="etitle"
                        value={note.etitle}
                        onChange={onchange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <div className="col-s-10">
                      <textarea
                        rows="5"
                        cols="33"
                        id="desc"
                        value={note.edescription}
                        name="edescription"
                        className="form-control bg-dark text-light"
                        onChange={onchange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="title" className="form-label">
                      Tags
                    </label>
                    <div className="col-s-10">
                      <input
                        type="text"
                        className="form-control bg-dark text-light"
                        id="etag"
                        name="etag"
                        onChange={onchange}
                        value={note.etag}
                      />
                    </div>
                  </div>

                 
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              onClick={()=>{ref.current.click();}}>
                Close
              </button>
              <button
                    type="submit"
                    className="btn btn-success "
                    onClick={handleclick}
                  >
                    Update a Record
                  </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hey bg-dark p-3 row my-5">
        <h2 className="d-flex align item-center justify-content-center pb-2">Your Notes in Cloud</h2>
        <hr className="bg-primary text-primary"></hr>
       
        {
 notes.length===0 &&
  <div className="container bg-dark p-3">
    <div className="d-flex flex-column text-primary hey bg-dark p-3">
                <h3 className="m-auto">No Notes Available</h3>
                <hr></hr>
            <h4 className="m-auto my-3">Start Adding Notes</h4>
            <p className="m-auto my-2">You haven't created any notes yet. To get started, click the "Add Note" button to create your first note.</p>
            <p className="m-auto my-1">If you need assistance, check the help section or the user guide for instructions on how to create and manage notes.</p>
            </div>

    </div>
}




    

        {notes &&
          notes.map((note) => {
            return <Noteitem key ={note._id}note={note} updatenote={updatenote} showAlert={showAlert} />;
          })}
      </div>
      
      
    </>
  );
};

export default Notes;
