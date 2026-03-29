export const   Notification = ({ latestAppointment }) => {
  if (!latestAppointment) return null;

  const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));

  return (
    <div className="notification-container">
      <div className="appointment-card">
        <h3 className="appointment-card__title">✅ Appointment Confirmed</h3>
        <p><strong>Doctor:</strong> {storedDoctorData?.name}</p>
        <p><strong>Speciality:</strong> {storedDoctorData?.speciality}</p>
        <p><strong>Patient Name:</strong> {latestAppointment.name}</p>
        <p><strong>Phone:</strong> {latestAppointment.phoneNumber}</p>
        <p><strong>Date:</strong> {latestAppointment.date}</p>
        <p><strong>Time:</strong> {latestAppointment.time}</p>
      </div>
    </div>
  );
};