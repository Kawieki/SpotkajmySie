export const useRegisterValidation = () => {
  const validateField = (name, value, allFormData = {}) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value || value.trim().length === 0) {
          error = "Imię jest wymagane";
        } else if (value.length < 2) {
          error = "Imię musi mieć minimum 2 znaki";
        } else if (value.length > 100) {
          error = "Imię może mieć maksymalnie 100 znaków";
        }
        break;

      case "lastName":
        if (!value || value.trim().length === 0) {
          error = "Nazwisko jest wymagane";
        } else if (value.length < 2) {
          error = "Nazwisko musi mieć minimum 2 znaki";
        } else if (value.length > 100) {
          error = "Nazwisko może mieć maksymalnie 100 znaków";
        }
        break;

      case "email":
        if (!value || value.trim().length === 0) {
          error = "Email jest wymagany";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Podaj poprawny adres email";
        } else if (value.length > 100) {
          error = "Email może mieć maksymalnie 100 znaków";
        }
        break;

      case "password":
        if (!value || value.length === 0) {
          error = "Hasło jest wymagane";
        } else if (value.length < 8) {
          error = "Hasło musi mieć minimum 8 znaków";
        }
        break;

      case "passwordConfirm":
        if (!value || value.length === 0) {
          error = "Powtórzenie hasła jest wymagane";
        } else if (allFormData.password && value !== allFormData.password) {
          error = "Hasła muszą być takie same";
        }
        break;

      case "description":
        if (value && value.length > 1000) {
          error = "Opis może mieć maksymalnie 1000 znaków";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = (formData) => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "passwordConfirm",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) errors[field] = error;
    });

    if (formData.description) {
      const error = validateField("description", formData.description);
      if (error) errors["description"] = error;
    }

    return errors;
  };

  return { validateField, validateAll };
};
