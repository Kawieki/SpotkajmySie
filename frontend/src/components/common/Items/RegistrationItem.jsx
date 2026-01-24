import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { USER_ROLES } from "../../../config.js";
import { updateRegistration } from "../../../services/registrationService.js";
import {
  getRegistrationLabel,
  getRegistrationBadgeClass,
} from "../../../utils/statusHelpers.js";
import { formatDateTime } from "../../../utils/DateHelpers.js";

const RegistrationItem = ({ registration, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm("Czy na pewno chcesz usunąć tę rejestrację?")) {
      onDelete(registration.id);
    }
  };

  const handleClick = async () => {
    try {
      setConfirming(true);
      await updateRegistration(registration.id, { status: "Confirmed" });
      setLocalStatus("Confirmed");
    } catch {
      setLocalStatus(registration.status);
    } finally {
      setConfirming(false);
    }
  };

  const isAdmin = user.role === USER_ROLES.ADMIN;
  const isOrganizer = user.role === USER_ROLES.ORGANIZER;
  const isUser = user.role === USER_ROLES.USER;

  const canEdit = isAdmin || isOrganizer;
  const canDelete = isAdmin || isUser;

  const [localStatus, setLocalStatus] = useState(registration.status);
  const [confirming, setConfirming] = useState(false);

  return (
    <tr>
      <td>{registration.id}</td>
      <td>
        <Link to={`/users/${registration.userId}`}>
          <strong>{registration.userName}</strong>
        </Link>
      </td>
      <td>
        <Link to={`/events/${registration.eventId}`}>
          {registration.eventTitle}
        </Link>
      </td>
      <td>{formatDateTime(registration.registrationDate)}</td>
      <td>
        <span className={`badge ${getRegistrationBadgeClass(localStatus)}`}>
          {getRegistrationLabel(localStatus)}
        </span>
      </td>
      <td>
        <div className="flex gap-sm">
          <Link
            to={`/registrations/${registration.id}`}
            className="btn btn-outline btn-small"
          >
            Szczegóły
          </Link>
          {isUser ? (
            <>
              {localStatus !== "Confirmed" && localStatus !== "Cancelled" ? (
                <button
                  className="btn btn-primary btn-small"
                  disabled={confirming}
                  onClick={handleClick}
                >
                  Potwierdź rejestrację
                </button>
              ) : null}
            </>
          ) : (
            canEdit && (
              <Link
                to={`/registrations/edit/${registration.id}`}
                className="btn btn-outline btn-small"
              >
                Edytuj
              </Link>
            )
          )}
          {canDelete && !(isUser && localStatus === "Cancelled") && (
            <button className="btn btn-danger btn-small" onClick={handleDelete}>
              Usuń
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default RegistrationItem;
