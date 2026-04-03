/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation.jsx';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch.jsx';
import DoctorCard from './Components/DoctorCard/DoctorCard.jsx';
import{ Notification} from "./Components/Notification/Notification.jsx";
import ReviewForm from './Components/ReviewForm/ReviewForm.jsx';
import GiveReviews from './Components/GiveReviews/GiveReviews.jsx';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  const [latestAppointment, setLatestAppointment] = useState(null);
  return (
    
        <BrowserRouter>
           <Navbar />
           <Notification latestAppointment={latestAppointment} />
          <Route path="/notification" element={<Notification />} />
         <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/LandingPage" element={<Landing_Page />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/search/doctors" element={<FindDoctorSearch />} />
            <Route path="/doctor/:id" element={<DoctorCard />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path='/GiveReviews' element={<GiveReviews />} />
            <Route path="/reports" element={<ReportsLayout />} />
            
          </Routes>
        </BrowserRouter>
    
  );
}

export default App;
