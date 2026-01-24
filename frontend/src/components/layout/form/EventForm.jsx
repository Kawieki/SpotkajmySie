import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../common/cards/Card.jsx";
import BackButton from "../../common/buttons/BackButton.jsx";
import FormField from "../../common/FormField.jsx";
import EventFormSidebar from "./EventFormSidebar.jsx";
import { useEventForm } from "../../../hooks/events/useEventForm.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { fetchOrganizers } from "../../../services/userService.js";
import { USER_ROLES } from "../../../config.js";
import FormErrors from "./FormErrors.jsx";
import ErrorPage from "../../../pages/ErrorPage.jsx";

const EventForm = ({
  initialData = {},
  onSubmit,
  isEdit = false,
  backendErrors = null,
}) => {
  const { user } = useAuth();
  const isAdmin = user.role === USER_ROLES.ADMIN;

  const [fetchError, setFetchError] = useState(null);
  const [organizers, setOrganizers] = useState([]);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);

  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit, handleReset } =
    useEventForm({ initialData, onSubmit, isAdmin });

  useEffect(() => {
    if (isAdmin) {
      fetchOrganizers()
        .then(setOrganizers)
        .catch((err) => setFetchError(err.message || "Wystąpił błąd"))
        .finally(() => setLoadingOrganizers(false));
    }
  }, [isAdmin]);

  if (fetchError) {
    return <ErrorPage error={fetchError} />;
  }

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
                  <h1>{isEdit ? "Edytuj wydarzenie" : "Dodaj wydarzenie"}</h1>
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
                    form="eventForm"
                  >
                    {isEdit ? "Zapisz zmiany" : "Zapisz wydarzenie"}
                  </button>
                </div>
              }
            >
              <form id="eventForm" onSubmit={handleSubmit} noValidate>
                <FormField
                  label="Tytuł wydarzenia"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  required
                  placeholder="Wprowadź tytuł wydarzenia..."
                  helpText="Minimum 2 znaków, maksimum 200 znaków"
                />

                <FormField
                  label="Opis wydarzenia"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  required
                  placeholder="Opisz szczegółowo wydarzenie..."
                  helpText="Minimum 20 znaków, maksimum 5000 znaków"
                />

                <div className="grid grid-2">
                  <FormField
                    label="Data rozpoczęcia"
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
                    required
                  />

                  <FormField
                    label="Data zakończenia"
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleChange}
                    error={errors.endDate}
                    required
                  />
                </div>

                <FormField
                  label="Lokalizacja"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  required
                  placeholder="np. Warszawa, ul. Główna 1"
                />

                {isAdmin ? (
                  <div className="form-group">
                    <label
                      htmlFor="organizerId"
                      className="form-label required"
                    >
                      Organizator
                    </label>
                    <select
                      id="organizerId"
                      name="organizerId"
                      className={`form-select ${errors.organizerId ? "error" : ""}`}
                      value={formData.organizerId}
                      onChange={handleChange}
                      disabled={loadingOrganizers}
                    >
                      <option value="">Wybierz organizatora</option>
                      {organizers.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.firstName} {org.lastName} ({org.email})
                        </option>
                      ))}
                    </select>
                    {errors.organizerId && (
                      <span className="form-error">{errors.organizerId}</span>
                    )}
                  </div>
                ) : (
                  <input
                    type="hidden"
                    name="organizerId"
                    value={user?.id || ""}
                  />
                )}

                <FormField
                  label="Limit uczestników"
                  name="maxPeople"
                  type="number"
                  value={formData.maxPeople}
                  onChange={handleChange}
                  error={errors.maxPeople}
                  placeholder="np. 100"
                  helpText="Opcjonalne, pozostań puste dla nielimitowanych miejsc"
                  min="1"
                  max="10000"
                />

                <div className="grid grid-2">
                  <FormField
                    label="Cena"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    error={errors.price}
                    placeholder="np. 50"
                    helpText="Opcjonalne, pozostań puste dla darmowych wydarzeń"
                    min="0"
                    step="0.01"
                  />

                  <FormField
                    label="Strona internetowa"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    error={errors.website}
                    placeholder="https://example.com"
                    helpText="Opcjonalne"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <input
                      type="checkbox"
                      name="isOnline"
                      checked={formData.isOnline}
                      onChange={(e) =>
                        handleChange({
                          target: { name: "isOnline", value: e.target.checked },
                        })
                      }
                      style={{ marginRight: "8px" }}
                    />
                    Wydarzenie online
                  </label>
                  {errors.isOnline && (
                    <span className="form-error">{errors.isOnline}</span>
                  )}
                </div>
              </form>
            </Card>
          </div>

          <div>
            <EventFormSidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventForm;
