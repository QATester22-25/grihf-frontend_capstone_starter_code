/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, time });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button type="submit" disabled={!time}>
          Book Now
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm; 
