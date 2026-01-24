import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import BackButton from "../../components/common/buttons/BackButton.jsx";
import Card from "../../components/common/cards/Card.jsx";
import DetailItem from "../../components/common/Items/DetailItem.jsx";
import { Link, useParams } from "react-router-dom";
import { formatDateRange, formatDateTime } from "../../utils/DateHelpers.js";
import {
  useRegistration,
  useRegistrations,
} from "../../hooks/registrations/useRegistrations.js";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";
import DeleteButton from "../../components/common/buttons/DeleteButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";
import { useState, useEffect } from "react";
import { updateRegistration } from "../../services/registrationService.js";
import {
  getRegistrationLabel,
  getRegistrationBadgeClass,
} from "../../utils/statusHelpers.js";
import { getUserBadge, getRoleLabel } from "../../utils/BadgesHelper.js";
import FormErrors from "../../components/layout/form/FormErrors.jsx";

const RegistrationDetails = () => {
  const { id } = useParams();
  const { registration, error, loading } = useRegistration(id);
  const { removeRegistration } = useRegistrations();
  const { user } = useAuth();

  const isAdmin = user.role === USER_ROLES.ADMIN;
  const isUser = user.role === USER_ROLES.USER;
  const canDelete = isAdmin || isUser;

  const [localRegistration, setLocalRegistration] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  useEffect(() => {
    if (registration) setLocalRegistration(registration);
  }, [registration]);

  const handleClick = async () => {
    try {
      setConfirming(true);

      await updateRegistration(registration.id, {
        status: "Confirmed",
      });

      setLocalRegistration((prev) => ({
        ...prev,
        status: "Confirmed",
      }));
    } catch (e) {
      setConfirmError(e);
      window.scrollTo(0, 0);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="mb-lg">
            <BackButton />
          </div>

          {confirmError && <FormErrors backendErrors={confirmError} />}

          <div className="grid grid-3">
            <div className="grid-col-span-2">
              <Card
                title={
                  <h1 className="card-title">
                    Szczegóły rejestracji #{registration.id}
                  </h1>
                }
                footer={
                  <>
                    {isUser ? (
                      localRegistration &&
                      localRegistration.status !== "Confirmed" &&
                      localRegistration.status !== "Cancelled" ? (
                        <button
                          className="btn btn-primary"
                          disabled={confirming}
                          onClick={handleClick}
                        >
                          Potwierdź rejestrację
                        </button>
                      ) : null
                    ) : (
                      <Link
                        to={`/registrations/edit/${registration.id}`}
                        className="btn btn-outline"
                      >
                        Edytuj
                      </Link>
                    )}

                    {canDelete &&
                      !(
                        isUser && localRegistration?.status === "Cancelled"
                      ) && (
                        <DeleteButton
                          itemId={registration.id}
                          confirmMessage="Czy na pewno chcesz usunąć rejestracje?"
                          redirectTo="/registrations"
                          onDelete={removeRegistration}
                        >
                          Usuń rejestrację
                        </DeleteButton>
                      )}
                  </>
                }
              >
                <h3>Informacje podstawowe</h3>
                <div className="grid grid-2">
                  <DetailItem
                    label="Użytkownik"
                    value={registration.userName}
                    linkTo={`/users/${registration.userId}`}
                  />

                  <DetailItem label="Email" value={registration.email} />

                  <DetailItem
                    label="Wydarzenie"
                    value={registration.eventTitle}
                    linkTo={`/events/${registration.eventId}`}
                  />

                  <DetailItem
                    label="Data wydarzenia"
                    value={formatDateRange(
                      registration.eventStartDate,
                      registration.eventEndDate,
                    )}
                  />

                  <DetailItem
                    label="Data rejestracji"
                    value={formatDateTime(registration.registrationDate)}
                  />

                  <DetailItem
                    label="Status"
                    value={
                      <span
                        className={`badge ${getRegistrationBadgeClass(
                          localRegistration?.status ?? registration.status,
                        )}`}
                      >
                        {getRegistrationLabel(
                          localRegistration?.status ?? registration.status,
                        )}
                      </span>
                    }
                  />
                </div>
              </Card>
            </div>

            <div>
              <Card
                title={<h3>O wydarzeniu</h3>}
                footer={
                  <>
                    <Link
                      to={`/events/${registration.eventId}`}
                      className="btn btn-outline btn-small w-full"
                    >
                      Zobacz szczegóły
                    </Link>
                  </>
                }
              >
                <h4>
                  <Link to={`/events/${registration.eventId}`}>
                    {registration.eventTitle}
                  </Link>
                </h4>
                <div className="event-meta mb-md">
                  <span className="event-meta-item">
                    {formatDateTime(registration.eventStartDate)}
                  </span>
                  <span className="event-meta-item">
                    {registration.eventLocation}
                  </span>
                </div>
                <p className="text-gray text-sm">
                  {registration.eventDescription}
                </p>
              </Card>
              <Card
                title={<h3> Uczestnik </h3>}
                footer={
                  <>
                    <Link
                      to={`/users/${registration.userId}`}
                      className="btn btn-outline btn-small w-full"
                    >
                      Zobacz profil
                    </Link>
                  </>
                }
              >
                <div className="mb-md">
                  <h4 className="mb-xs">
                    <Link to={`/users/${registration.userId}`}>
                      {registration.userName}
                    </Link>
                  </h4>
                  <p className="m-0 text-gray text-sm">{registration.email}</p>
                  <span
                    className={`badge ${getUserBadge(registration.role)} mt-sm`}
                  >
                    {getRoleLabel(registration.role)}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationDetails;
