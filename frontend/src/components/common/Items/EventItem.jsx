import React from "react";
import { formatDate, getEventType } from "../../../utils/DateHelpers.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getEventBadge } from "../../../utils/BadgesHelper.js";

const EventItem = ({ event, handleClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  let date = formatDate(event.startDate);
  return (
    <div className="card event-card">
      <div className="event-date">
        <div className="event-date-day">{date.day}</div>
        <div className="event-date-month">{date.month}</div>
        <div className="event-date-year">{date.year}</div>
      </div>
      <div className="event-info">
        <h3 className="event-title">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <div className="event-meta">
          <span className="event-meta-item"> {event.location} </span>
          <span className="event-meta-item"> {event.organizer} </span>
          <span className={getEventBadge(event.isOnline)}>
            {getEventType(event.isOnline)}
          </span>
        </div>
        <p>{event.description}</p>
        <div className="card-footer">
          <Link
            to={`/events/${event.id}`}
            className="btn btn-outline btn-small"
          >
            Zobacz szczegóły
          </Link>
          {user ? (
            event.isCurrentUserRegistered ? (
              <button className="btn btn-success btn-small" disabled>
                Już zapisany
              </button>
            ) : (
              <button
                className="btn btn-primary btn-small"
                onClick={() => handleClick(user.id, event.id)}
              >
                Zapisz się
              </button>
            )
          ) : (
            <button
              className="btn btn-primary btn-small"
              onClick={() => navigate("/login")}
            >
              Zaloguj sie aby sie zapisac
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
