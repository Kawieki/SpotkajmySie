import React from "react";
import { USER_ROLES } from "../../../config.js";

const UserStatisticsCard = ({ user }) => {
  const isOrganizer = user.role === USER_ROLES.ORGANIZER;
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Statystyki</h3>
      </div>
      <div className="card-body">
        {isOrganizer && (
          <div className="text-center mb-lg">
            <h2 className="stat-value text-primary">
              {user.organizedEventsCount || "0"}
            </h2>
            <p className="stat-label">Zorganizowanych wydarzeń</p>
          </div>
        )}

        {isOrganizer && (
          <div className="text-center mb-lg">
            <h2 className="stat-value text-secondary">
              {user.totalAttendeesCount || "0"}
            </h2>
            <p className="stat-label">Łączna liczba uczestników</p>
          </div>
        )}

        <div className="text-center">
          <h2 className="stat-value text-info">
            {user.participatedEventsCount || "0"}
          </h2>
          <p className="stat-label">Uczestnictw w wydarzeniach</p>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsCard;
