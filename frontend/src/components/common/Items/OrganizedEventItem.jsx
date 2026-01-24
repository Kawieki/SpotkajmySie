import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateHelpers.js";

const OrganizedEventItem = ({ event, compact }) => {
  return (
    <div className="card bg-gray-lighter">
      <div className={`event-card ${compact ? "compact" : ""}`}>
        <div className="event-date">
          <div className="event-date-day">
            {formatDate(event.startDate).day}
          </div>
          <div className="event-date-month">
            {formatDate(event.startDate).month}
          </div>
          <div className="event-date-year">
            {formatDate(event.startDate).year}
          </div>
        </div>
        <div className="event-info">
          <h4 className="event-title">
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </h4>
          <div className="event-meta">
            <span className="event-meta-item">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizedEventItem;
