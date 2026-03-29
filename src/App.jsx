import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.jsx';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch.jsx';
import DoctorCardIC from './Components/DoctorCard/DoctorCard.jsx';
import{ Notification} from "./Components/Notification/Notification.jsx";


function App() {
  const [latestAppointment, setLatestAppointment] = useState(null);
  return (
    
        <BrowserRouter>
      <Navbar />
      <Notification latestAppointment={latestAppointment} />
         <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/LandingPage" element={<Landing_Page />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/search/doctors" element={<FindDoctorSearch />} />
           
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;
