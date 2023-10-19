import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import Notes from './Notes';
const Home = () => {
 
  const context=useContext(NoteContext);
  const{addNote}=context;
  const [notedata,setnodedata]=useState({title:"",description:"",tag:"default"})
  const onChange=(e)=>{
    setnodedata({...notedata,[e.target.name]:e.target.value})

  }
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(notedata.title,notedata.description,notedata.tag)

  }
  return (
    <div className='container my-3 text-light'>
      <div className="d-flex justify-content-around flex-wrap" >
    
   


    <div className='hey ml-auto  my-3 p-3 bg-dark' >
    
    <h2 class="d-flex align-items-center justify-content-center pb-1 px-2" style={{maxWidth:'46rem'}}>User details
            </h2>
            <hr></hr>
      <div className="circleavtar m-auto">
        <img src="https://static.wixstatic.com/media/c95985_ccdb9d92abdd41459ee70b7bf20bbd82~mv2.gif" alt="dp"/>
       
       

      </div>
      <div className='my-2 p-2 d-flex flex-column'>
      <h7 class="my-1 text-light mx-2" style={{display:'inline-block'}}>Name: <span class="mx-2 text-primary">Rajnikant</span> </h7>
      
      <h7 class="my-1 text-light mx-2" style={{display:'inline-block'}}>Email:  <span class="mx-1 text-primary">Rajnikant1021@gmail.com</span> </h7>

      <button type="submit" class="p-1 my-4 btn btn-danger " onClick={handleClick}>Exit the notebook</button>
     

      </div>
      

    </div>
    <div className='hey my-3 p-3 bg-dark align-items-center'style={{width:'44rem'}}>
    
    <h2 class="d-flex align-items-center justify-content-center pb-1 px-2 inline-block">Record a New Entry
            </h2>
            <hr></hr>
            <form class="mx-4 align-items-center justify-content-center ">
      <div class="row mb-3">
        <label for="title" class="form-label">Title</label>
        <div class="col-s-10">
          <input type="text" class="form-control bg-dark text-light" id="title" name="title" onChange={onChange}/>
        </div>
      </div>
      <div class="row mb-3">
        <label for="description"class="form-label">Description</label>
        <div class="col-s-10">
        <textarea rows="5" cols="33"  id="desc" name="description" class="form-control bg-dark text-light" onChange={onChange} />
        </div>
      </div>
    
      <button type="submit" class="btn btn-success " onClick={handleClick}>Submit a Record</button>
    </form>
    </div>
      </div>
    


      <Notes/>




    </div>
  )
}

export default Home