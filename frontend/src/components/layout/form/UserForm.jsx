import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { USER_ROLES } from "../../../config.js";
import { getRoleLabel } from "../../../utils/BadgesHelper.js";
import { useUserForm } from "../../../hooks/users/useUserForm.js";
import Card from "../../common/cards/Card.jsx";
import BackButton from "../../common/buttons/BackButton.jsx";
import FormField from "../../common/FormField.jsx";
import FormErrors from "./FormErrors.jsx";
import CreateUserInfoCard from "../../common/cards/CreateUserInfoCard.jsx";

const UserForm = ({
  initialData = {},
  onSubmit,
  isEdit = false,
  backendErrors = null,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const { formData, errors, handleChange, handleSubmit, handleReset } =
    useUserForm({ initialData, onSubmit, isAdmin });

  const roleOptions = [
    { value: USER_ROLES.USER, label: getRoleLabel(USER_ROLES.USER) },
    { value: USER_ROLES.ORGANIZER, label: getRoleLabel(USER_ROLES.ORGANIZER) },
    { value: USER_ROLES.ADMIN, label: getRoleLabel(USER_ROLES.ADMIN) },
  ];

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
                  <h1>{isEdit ? "Edytuj użytkownika" : "Dodaj użytkownika"}</h1>
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
                    form="userForm"
                  >
                    {isEdit ? "Zapisz zmiany" : "Zapisz użytkownika"}
                  </button>
                </div>
              }
            >
              <form id="userForm" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-2">
                  <FormField
                    label="Imię"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                    placeholder="Jan"
                    helpText="Minimum 2 znaki, maksimum 100 znaków"
                  />

                  <FormField
                    label="Nazwisko"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                    placeholder="Kowalski"
                    helpText="Minimum 2 znaki, maksimum 100 znaków"
                  />
                </div>

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="jan.kowalski@example.com"
                  helpText="Podaj prawidłowy adres email"
                />

                {!isEdit && (
                  <>
                    <div className="grid grid-2">
                      <FormField
                        label="Hasło"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                        placeholder="••••••••"
                        helpText="Minimum 8 znaków"
                      />

                      <FormField
                        label="Potwierdź hasło"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                  </>
                )}

                {isAdmin && (
                  <div className="form-group">
                    <label htmlFor="role" className="form-label required">
                      Rola
                    </label>
                    <select
                      id="role"
                      name="role"
                      className={`form-select ${errors.role ? "error" : ""}`}
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Wybierz rolę</option>
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <span className="form-error">{errors.role}</span>
                    )}
                    <small className="form-help">
                      <strong>Użytkownik:</strong> może przeglądać i zapisywać
                      się na wydarzenia
                      <br />
                      <strong>Organizator:</strong> może tworzyć i zarządzać
                      wydarzeniami
                      <br />
                      <strong>Administrator:</strong> pełny dostęp do systemu
                    </small>
                  </div>
                )}

                <FormField
                  label="O mnie"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  placeholder="Krótki opis..."
                  helpText="Opcjonalny opis profilu (max 1000 znaków)"
                />
              </form>
            </Card>
          </div>
          <div>
            <CreateUserInfoCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserForm;
