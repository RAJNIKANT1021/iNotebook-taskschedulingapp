import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Signup = ({showAlert}) => {
  const navigate=useNavigate();
  const [user,setuser]=useState({name:"",email:"",password:""})
  const change=(e)=>{
      setuser({...user,[e.target.name]:e.target.value});

     
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
   const response= await fetch("https://notebookapi-rho.vercel.app/api/auth/createuser",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body :JSON.stringify({name:user.name,email:user.email,password:user.password})
      
    
        });
        const json=await response.json();
      if(json.success){
        localStorage.setItem('token',json.authtoken);
   navigate("/",{replace:true})
      }else{
        
        if(Array.isArray(json.errors)){
          showAlert(json.errors[0].msg,'danger')

        }else
        showAlert(json.error,'danger')
        
      }
      

}
  return (
   
    <form className="hey bg-dark p-3 mx-auto" onSubmit={handleSubmit}style={{maxWidth:'35rem',marginTop:'2rem'}}>
        <h2 className='d-flex justify-content-center text-primary'>Start Organizing Your Notes</h2>
        <hr></hr>
          {/* <div className="circleavtar m-auto mb-3">
        <img src="https://static.wixstatic.com/media/c95985_ccdb9d92abdd41459ee70b7bf20bbd82~mv2.gif" alt="dp"/>
       
       

      </div> */}
      <div className="mb-3">
    <label htmlFor="name" className="form-label bg-dark text-light">Username</label>
    <input type="name " className="form-control bg-dark text-light" id="exampleInputName" name="name" aria-describedby="Namehelp" onChange={change}/>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label bg-dark text-light">Email address</label>
    <input type="email " className="form-control bg-dark text-light" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={change}/>
    <div id="emailHelp" className="form-text text-secondary mx-2">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control bg-dark   text-light" id="exampleInputPassword1" name="password" onChange={change}/>
  </div>

  <button type="submit" className="my-2 p-2 form-control btn btn-success">Way to your First Notebook</button>
</form>

  )
}

export default Signup