export const useUserValidation = () => {
  const validateField = (name, value, allFormData = {}) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value || value.trim().length === 0) {
          error = "Imię jest wymagane";
        } else if (value.trim().length < 2) {
          error = "Imię musi mieć minimum 2 znaki";
        } else if (value.trim().length > 100) {
          error = "Imię może mieć maksymalnie 100 znaków";
        }
        break;

      case "lastName":
        if (!value || value.trim().length === 0) {
          error = "Nazwisko jest wymagane";
        } else if (value.trim().length < 2) {
          error = "Nazwisko musi mieć minimum 2 znaki";
        } else if (value.trim().length > 100) {
          error = "Nazwisko może mieć maksymalnie 100 znaków";
        }
        break;

      case "email":
        if (!value || value.trim().length === 0) {
          error = "Email jest wymagany";
        } else {
          const re = /^\S+@\S+\.\S+$/;
          if (!re.test(value)) error = "Niepoprawny adres email";
        }
        break;

      case "password":
        if (value && value.trim().length > 0 && value.length < 8) {
          error = "Hasło musi mieć minimum 8 znaków";
        }
        break;

      case "confirmPassword":
        if (allFormData.password && value !== allFormData.password) {
          error = "Hasła nie są takie same";
        }
        break;

      case "role":
        if (!value) {
          error = "Rola jest wymagana";
        }
        break;

      case "description":
        if (value && value.length > 1000) {
          error = "Opis może mieć maksymalnie 1000 znaków";
        }
        break;
    }

    return error;
  };

  const validateAll = (formData) => {
    const errors = {};
    const requiredFields = ["firstName", "lastName", "email", "role"];
    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) errors[field] = error;
    });

    if (formData.password || formData.confirmPassword) {
      const pwError = validateField("password", formData.password, formData);
      if (pwError) errors["password"] = pwError;
      const cpwError = validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData,
      );
      if (cpwError) errors["confirmPassword"] = cpwError;
    }

    if (formData.description) {
      const error = validateField(
        "description",
        formData.description,
        formData,
      );
      if (error) errors["description"] = error;
    }
    return errors;
  };

  return { validateField, validateAll };
};
