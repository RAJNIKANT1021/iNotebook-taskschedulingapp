import React from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

export default function App() {
  return (
    <Router>
             <Navbar/>
             <Alert/>
      <div className="container">

      
      

        <Routes> 
                <Route exact path='/' element={< Home />}></Route> 
                <Route exact path='/about' element={< About />}></Route> 
             
        </Routes> 
      </div>
    </Router>
  );
}