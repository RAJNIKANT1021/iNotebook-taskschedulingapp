/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert"
import Login from "./components/login";
import Signup from "./components/signup";

export default function App() {
  const [alert, setAlert] = useState(null);
const showAlert = (message, type) =>{
setAlert({
msg: message,
type: type
})
setTimeout( ()=> {
setAlert (null);
}, 2000);}
  useEffect(()=>{

  },[localStorage.getItem('token')])
  return (
    <Router>
        
             <Navbar/>
             <Alert alert={alert}/>
          
      <div className="container">

      
      

        <Routes> 
         <Route exact path='/' element={< Home showAlert={showAlert}/>}></Route> :  

            <Route exact path='/login' element={< Login showAlert={showAlert}/>}></Route>
          
            {
            localStorage.getItem('token') ?  <Route exact path='/about' element={< About />}></Route> :
            <Route exact path='/about' element={< Login showAlert={showAlert}/>}></Route>
          }
           
                
                <Route exact path='/login' element={< Login showAlert={showAlert}/>}></Route>
                <Route exact path='/signup' element={< Signup showAlert={showAlert} />}></Route>
               
             
        </Routes> 
      </div>
    </Router>
  );
}