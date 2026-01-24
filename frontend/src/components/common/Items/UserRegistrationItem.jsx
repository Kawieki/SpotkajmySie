import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateHelpers.js";
import {getRegistrationLabel} from "../../../utils/statusHelpers.js";

const UserRegistrationItem = ({ registration, compact }) => {
  return (
    <div className="card bg-gray-lighter">
      <div className={`event-card ${compact ? "compact" : ""}`}>
        <div className="event-date">
          <div className="event-date-day">
            {formatDate(registration.start).day}
          </div>
          <div className="event-date-month">
            {formatDate(registration.start).month}
          </div>
          <div className="event-date-month">
            {formatDate(registration.start).year}
          </div>
        </div>
        <div className="event-info">
          <h4 className="event-title">
            <Link to={`/registrations/${registration.id}`}>
              {registration.title}
            </Link>
          </h4>
          <div className="event-meta">
            <span className="event-meta-item">{getRegistrationLabel(registration.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationItem;
