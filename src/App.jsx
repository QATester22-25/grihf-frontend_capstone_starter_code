import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
         <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
