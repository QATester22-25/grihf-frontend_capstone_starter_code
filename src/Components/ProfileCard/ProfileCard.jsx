import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name: initialName = 'Unknown User', email = 'N/A', phone: initialPhone = 'N/A' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [statusMessage, setStatusMessage] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setStatusMessage('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatusMessage('Please fill both name and phone');
      return;
    }

    setIsEditing(false);
    setStatusMessage('Profile updated successfully.');

    setTimeout(() => {
      setStatusMessage('');
    }, 10000);
  };

  return (
    <div className="profile-card">
      {isEditing ? (
        <form className="profile-card__edit-form" onSubmit={handleUpdate}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Phone
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>

          <label>
            Email
            <input value={email} disabled />
          </label>

          <button type="submit" className="profile-card__update-btn">
            Update
          </button>

          <button type="button" className="profile-card__cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>

          {statusMessage && <p className="profile-card__status">{statusMessage}</p>}
        </form>
      ) : (
        <>
          <div className="profile-card__header">
            <div className="profile-card__avatar--centered" aria-hidden="true">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-card__body">
            <p>
              <span className="profile-card__label">Name: </span>
              <span>{name}</span>
            </p>
            <p>
              <span className="profile-card__label">Phone: </span>
              <span>{phone}</span>
            </p>
            <p>
              <span className="profile-card__label">Email: </span>
              <span>{email}</span>
            </p>
          </div>

          <button type="button" className="profile-card__edit-btn" onClick={handleEdit}>
            Edit
          </button>

          {statusMessage && <p className="profile-card__status">{statusMessage}</p>}
        </>
      )}
    </div>
  );
};

export default ProfileCard;
