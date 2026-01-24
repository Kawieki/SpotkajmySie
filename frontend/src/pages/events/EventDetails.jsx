import { Link, useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/buttons/BackButton.jsx";
import { useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import { useEvent } from "../../hooks/events/useEvents.js";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";
import { formatDateTime } from "../../utils/DateHelpers.js";
import { signForEvent } from "../../services/registrationService.js";
import { deleteEvent } from "../../services/eventService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";
import FormErrors from "../../components/layout/form/FormErrors.jsx";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { error, loading, event } = useEvent(id);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  if (!event) return null;

  const isOrganizerOrAdmin =
    event.isCurrentUserOrganizer || user?.role === USER_ROLES.ADMIN;
  const isRegistered = event.isCurrentUserRegistered;

  const handleRegister = async () => {
    try {
      const registration = await signForEvent(user.id, parseInt(id));
      navigate(`/registrations/${registration.id}`);
    } catch (err) {
      setErrors(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) return;
    try {
      await deleteEvent(event.id);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="mb-lg">
            <BackButton />
          </div>

          {errors && <FormErrors backendErrors={errors} />}

          <div className="grid grid-3">
            <div className="grid-col-span-2">
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">{event.title}</h1>
                  <div className="event-meta">
                    <span className="event-meta-item">
                      📅 {formatDateTime(event.startDate)}
                    </span>
                    <span className="event-meta-item">📍 {event.location}</span>
                    <span
                      className={`badge ${event.isOnline ? "badge-success" : "badge-primary"}`}
                    >
                      {event.isOnline ? "Online" : "Na miejscu"}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h3>Opis wydarzenia</h3>
                  <p>{event.description}</p>

                  <div className="mt-lg">
                    <h3>Szczegóły</h3>
                    <div className="grid grid-2">
                      <div>
                        <p>
                          <strong>Data rozpoczęcia:</strong>
                          <br />
                          {formatDateTime(event.startDate)}
                        </p>
                        <p>
                          <strong>Data zakończenia:</strong>
                          <br />
                          {formatDateTime(event.endDate)}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Uczestników:</strong>{" "}
                          {event.participantsCount}
                        </p>
                        <p>
                          <strong>Pozostało miejsc:</strong>{" "}
                          {event.maxPeople ? event.spotsLeft : "Bez Limitu"}
                        </p>

                        <p>
                          <strong>Cena:</strong>{" "}
                          {event.price ? `${event.price} zł` : "Za Darmo"}
                        </p>

                        {event.website && (
                          <p>
                            <strong>Strona internetowa:</strong>
                            <br />
                            <a
                              href={event.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {event.website}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  {isOrganizerOrAdmin && (
                    <>
                      <Link
                        to={`/events/edit/${event.id}`}
                        className="btn btn-outline"
                      >
                        Edytuj wydarzenie
                      </Link>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Usuń wydarzenie
                      </button>
                    </>
                  )}

                  {!isOrganizerOrAdmin && user && !isRegistered && (
                    <button
                      className="btn btn-primary btn-large"
                      onClick={handleRegister}
                    >
                      Zapisz się na wydarzenie
                    </button>
                  )}

                  {!isOrganizerOrAdmin && !user && (
                    <Link to="/login" className="btn btn-primary btn-large">
                      Zaloguj się, aby zapisać się na wydarzenie
                    </Link>
                  )}

                  {!isOrganizerOrAdmin && isRegistered && (
                    <button className="btn btn-success btn-large" disabled>
                      Jesteś już zapisany na to wydarzenie
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Organizator</h3>
                </div>
                <div className="card-body">
                  <h4 className="mb-xs">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </h4>
                  <p className="text-gray text-sm">{event.organizer.email}</p>
                  {event.organizer.description && (
                    <p className="mt-sm text-sm">
                      {event.organizer.description}
                    </p>
                  )}
                  <Link
                    to={`/users/${event.organizer.id}`}
                    className="btn btn-outline btn-small mt-md"
                  >
                    Zobacz profil
                  </Link>
                </div>
              </div>

              <div className="card mt-md">
                <div className="card-header">
                  <h3 className="card-title">
                    Uczestnicy ({event.participantsCount})
                  </h3>
                </div>
                <div className="card-body">
                  {event.participants ? (
                    event.participants.length > 0 ? (
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {event.participants.map((p) => (
                          <li
                            key={p.id}
                            className="mb-sm flex gap-sm"
                            style={{ alignItems: "center" }}
                          >
                            <span>
                              {p.firstName} {p.lastName}
                            </span>
                            <Link
                              to={`/users/${p.id}`}
                              className="btn btn-outline btn-small"
                            >
                              Zobacz profil
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray">Brak zapisanych uczestników.</p>
                    )
                  ) : (
                    <p className="text-gray text-sm">
                      Lista uczestników dostępna tylko dla organizatora.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventDetails;
