import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
const Login = ({showAlert}) => {
    const navigate=useNavigate();
    const [user,setuser]=useState({email:"",password:""})
    const change=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});

       
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
       const response= await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body :JSON.stringify({email:user.email,password:user.password})
          
        
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
   
    <form class="hey bg-dark p-3 mx-auto"onSubmit={handleSubmit} style={{maxWidth:'35rem',marginTop:'2rem'}}>
        <h2 className='d-flex justify-content-center text-primary'>Access Your Notes</h2>
        <hr></hr>
          <div className="circleavtar m-auto mb-3">
        <img src="https://static.wixstatic.com/media/c95985_ccdb9d92abdd41459ee70b7bf20bbd82~mv2.gif" alt="dp"/>
       
       

      </div>
  <div class="mb-3">
    <label htmlFor="exampleInputEmail1" class="form-label bg-dark text-light" name="email">Email address</label>
    <input type="email " class="form-control bg-dark  text-light" id="exampleInputEmail1"  onChange={change} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text text-secondary mx-2">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputPassword1" class="form-label" >Password</label>
    <input type="password"  onChange={change}  name="password" class="form-control bg-dark text-light" id="exampleInputPassword1"/>
  </div>

  <button type="submit" class="my-2 p-2 form-control btn btn-success">Way to your Notes</button>
</form>

  )
}

export default Login