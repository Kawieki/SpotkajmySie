import React from "react";
import { formatDate, getEventType } from "../../../utils/DateHelpers.js";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../../services/eventService.js";
import { getEventBadge } from "../../../utils/BadgesHelper.js";

const EventItemManagement = ({ event, onDelete }) => {
  const date = formatDate(event.startDate);

  const handleDelete = async () => {
    if (
      window.confirm(`Czy na pewno chcesz usunąć wydarzenie "${event.title}"?`)
    ) {
      try {
        await deleteEvent(event.id);
        if (onDelete) {
          onDelete(event.id);
        }
      } catch (error) {
        alert(error.message || "Nie udało się usunąć wydarzenia");
      }
    }
  };

  return (
    <tr>
      <td>{event.id}</td>
      <td>
        <Link to={`/events/${event.id}`}>
          <strong>{event.title}</strong>
        </Link>
      </td>
      <td>
        {date.day} {date.month} {date.year}
      </td>
      <td>{event.location}</td>
      <td>
        <span className={getEventBadge(event.isOnline)}>
          {getEventType(event.isOnline)}
        </span>
      </td>
      <td>
        <Link to={`/users/${event.organizerId}`}>{event.organizer}</Link>
      </td>
      <td>
        <div className="flex gap-sm">
          <Link
            to={`/events/${event.id}`}
            className="btn btn-outline btn-small"
          >
            Szczegóły
          </Link>
          <Link
            to={`/events/edit/${event.id}`}
            className="btn btn-outline btn-small"
          >
            Edytuj
          </Link>
          <button className="btn btn-danger btn-small" onClick={handleDelete}>
            Usuń
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EventItemManagement;
