/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({ name, speciality, experience, ratings, setLatestAppointment }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Cancel an appointment
  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);

    // Remove notification when canceled
    if (setLatestAppointment) setLatestAppointment(null);
  };

  // Booking an appointment
  const handleFormSubmit = (appointmentData) => {
    const newAppointment = { id: uuidv4(), ...appointmentData };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    // Save doctor info and appointment in localStorage (optional)
    localStorage.setItem(
      "doctorData",
      JSON.stringify({ name, speciality })
    );
    localStorage.setItem(name, JSON.stringify(newAppointment));

    // Trigger notification via parent state
    if (setLatestAppointment) setLatestAppointment(newAppointment);

    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <img
            src="/doctor-icon-avatar-white_136162-58.avif"
            alt="Doctor"
            className="doctor-profile-image"
          />
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button
              className={`book-appointment-btn ${
                appointments.length > 0 ? "cancel-appointment" : ""
              }`}
            >
              {appointments.length > 0 ? <div>Cancel Appointment</div> : <div>Book Appointment</div>}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="doctorbg" style={{ height: "100vh", overflow: "scroll" }}>
            <div>
              <div className="doctor-card-profile-image-container">
                <img
                  src="/1690923295547doctor1.png"
                  alt="Doctor"
                  className="doctor-profile-image"
                />
              </div>

              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">{speciality}</div>
                <div className="doctor-card-detail-experience">{experience} years experience</div>
                <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
              </div>
            </div>

            {appointments.length > 0 ? (
              <>
                <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
                {appointments.map((appointment) => (
                  <div className="bookedInfo" key={appointment.id}>
                    <p>Name: {appointment.name}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                  </div>
                ))}
              </>
            ) : (
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;