import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../common/cards/Card.jsx";
import BackButton from "../../common/Buttons/BackButton.jsx";
import FormField from "../../common/FormField.jsx";
import FormErrors from "./FormErrors.jsx";
import { useRegisterForm } from "../../../hooks/auth/useRegisterForm.js";
import { registerUser } from "../../../services/authService.js";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const payload = { ...data };
      delete payload.passwordConfirm;
      await registerUser(payload);
      navigate("/login");
    } catch (err) {
      setBackendErrors(err.message || "Wystąpił błąd podczas rejestracji");
    }
  };

  const {
    formData,
    errors,
    handleChange,
    handleSubmit: onSubmit,
    handleReset,
  } = useRegisterForm({ onSubmit: handleSubmit });

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
                  <h1>Zarejestruj się</h1>
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
                    onClick={() => navigate("/login")}
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
                    form="registerForm"
                  >
                    Zarejestruj się
                  </button>
                </div>
              }
            >
              <form id="registerForm" onSubmit={onSubmit} noValidate>
                <div className="grid grid-2">
                  <FormField
                    label="Imię"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                    placeholder="Wprowadź swoje imię..."
                    helpText="Minimum 2 znaki, maksimum 100 znaków"
                  />

                  <FormField
                    label="Nazwisko"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                    placeholder="Wprowadź swoje nazwisko..."
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
                  placeholder="twoj@email.com"
                  helpText="Będzie używany do logowania"
                />

                <FormField
                  label="Hasło"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  placeholder="Wprowadź hasło..."
                  helpText="Minimum 8 znaków"
                />

                <FormField
                  label="Powtórz hasło"
                  name="passwordConfirm"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  error={errors.passwordConfirm}
                  required
                  placeholder="Powtórz hasło..."
                />

                <FormField
                  label="Opis"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  placeholder="Opcjonalnie napisz coś o sobie..."
                  helpText="Maksymalnie 1000 znaków"
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
