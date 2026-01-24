import React from "react";
import UserRegistrationItem from "../Items/UserRegistrationItem.jsx";

const RegistrationsCard = ({ user }) => {
  const registrations = user.registrations;
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Rejestracje na wydarzenia</h2>
        <div className="card-body">
          {registrations &&
            registrations.map((reg) => (
              <UserRegistrationItem registration={reg} key={reg.id} compact />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationsCard;
