import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../common/cards/Card.jsx";
import BackButton from "../../common/buttons/BackButton.jsx";
import FormField from "../../common/FormField.jsx";
import FormErrors from "./FormErrors.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useRegistrationForm } from "../../../hooks/registrations/useRegistrationForm.js";
import { fetchUsers } from "../../../services/userService.js";
import { fetchEvents } from "../../../services/eventService.js";
import { USER_ROLES, REGISTRATION_STATUS } from "../../../config.js";
import LoadingPage from "../../../pages/LoadingPage.jsx";

const statusOptions = [
  { value: REGISTRATION_STATUS.PENDING, label: "Oczekująca" },
  { value: REGISTRATION_STATUS.CONFIRMED, label: "Potwierdzona" },
  { value: REGISTRATION_STATUS.CANCELLED, label: "Anulowana" },
];

const RegistrationForm = ({
  initialData = {},
  onSubmit,
  isEdit = false,
  backendErrors = null,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(isAdmin && !isEdit);

  const { formData, errors, handleChange, handleSubmit, handleReset } =
    useRegistrationForm({ initialData, onSubmit, isEdit });

  const availableStatusOptions = isEdit
    ? statusOptions
    : statusOptions.filter((o) => o.value !== REGISTRATION_STATUS.CANCELLED);

  useEffect(() => {
    if (isAdmin && !isEdit) {
      Promise.all([fetchUsers(1, 1000), fetchEvents(1, 1000)])
        .then(([usersData, eventsData]) => {
          setUsers(usersData.items);
          setEvents(eventsData.items);
        })
          .catch((err) => {
            alert("Nie udało się pobrać danych");
            console.error("Failed to fetch data:", err);
          })
        .finally(() => setLoading(false));
    }
  }, [isAdmin, isEdit]);

  if (loading) return <LoadingPage />;

  return (
    <main className="main-content">
      <div className="container">
        <div className="mb-lg">
          <BackButton />
        </div>

        {backendErrors && <FormErrors backendErrors={backendErrors} />}

        <div className="grid grid-3">
          <div className="grid-col-span-2">
            <Card
              title={
                <>
                  <h1>{isEdit ? "Edytuj rejestrację" : "Dodaj rejestrację"}</h1>
                  <p className="text-gray m-0 mb-md">
                    Pola oznaczone * są wymagane
                  </p>
                </>
              }
              footer={
                <div className="flex gap-sm justify-end">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => navigate(-1)}
                  >
                    Anuluj
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleReset}
                  >
                    Resetuj
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    form="registrationForm"
                  >
                    {isEdit ? "Zapisz zmiany" : "Zapisz rejestrację"}
                  </button>
                </div>
              }
            >
              <form id="registrationForm" onSubmit={handleSubmit} noValidate>
                {!isEdit && (
                  <>
                    <FormField
                      label="Użytkownik"
                      name="userId"
                      type="select"
                      value={formData.userId}
                      onChange={handleChange}
                      error={errors.userId}
                      required
                    >
                      <option value="">Wybierz użytkownika</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.firstName} {u.lastName} ({u.email})
                        </option>
                      ))}
                    </FormField>

                    <FormField
                      label="Wydarzenie"
                      name="eventId"
                      type="select"
                      value={formData.eventId}
                      onChange={handleChange}
                      error={errors.eventId}
                      required
                    >
                      <option value="">Wybierz wydarzenie</option>
                      {events.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.title}
                        </option>
                      ))}
                    </FormField>
                  </>
                )}

                <FormField
                  label="Status"
                  name="status"
                  type="select"
                  value={formData.status}
                  onChange={handleChange}
                  error={errors.status}
                  required
                >
                  {availableStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormField>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;
