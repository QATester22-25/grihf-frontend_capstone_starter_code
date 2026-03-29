import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.jsx';
import FindDoctorSearchIC from './Components/InstantConsultationBooking/InstantConsultationBooking/FindDoctorSearchIC/FindDoctorSearchIC.jsx';
import AppointmentFormIC from './Components/InstantConsultationBooking/InstantConsultationBooking/AppointmentFormIC/AppointmentFormIC.jsx';
import DoctorCardIC from './Components/InstantConsultationBooking/InstantConsultationBooking/DoctorCardIC/DoctorCardIC.jsx';

function App() {

  return (
    
        <BrowserRouter>
            <Navbar/>
         <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/LandingPage" element={<Landing_Page />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/search/doctors" element={<FindDoctorSearchIC />} />
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;
