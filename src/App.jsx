import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

function App() {

  return (
    
        <BrowserRouter>
            <Navbar/>
         <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/LandingPage" element={<Landing_Page/>}/>
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;
