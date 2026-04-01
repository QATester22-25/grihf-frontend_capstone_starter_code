import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name = 'Unknown User', email = 'N/A', phone = 'N/A' }) => {
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <div className="profile-card__avatar" aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>

      <div className="profile-card__body">
        <p>
          <span className="profile-card__label">Email: </span>
          <span>{email}</span>
        </p>
        <p>
          <span className="profile-card__label">Phone: </span>
          <span>{phone}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
