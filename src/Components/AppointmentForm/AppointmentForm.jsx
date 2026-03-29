/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
]; 
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber,date ,time });
    setName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <div>
          <label htmlFor="date">Appointment Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {date && (
  <div>
    <label>Select Time:</label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {timeSlots.map((slot) => (
        <button
          type="button"
          key={slot}
          onClick={() => setTime(slot)}
          style={{
            padding: "8px",
            border: time === slot ? "2px solid white" : "1px solid green",
            backgroundColor: time === slot ? "red" : "blue",
            cursor: "pointer",
          }}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>
)}
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
