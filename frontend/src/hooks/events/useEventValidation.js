export const useEventValidation = () => {
  const validateField = (name, value, allFormData = {}, isAdmin = true) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value || value.trim().length === 0) {
          error = "Tytuł jest wymagany";
        } else if (value.length < 2) {
          error = "Tytuł musi mieć minimum 2 znaków";
        } else if (value.length > 200) {
          error = "Tytuł może mieć maksymalnie 200 znaków";
        }
        break;

      case "description":
        if (!value || value.trim().length === 0) {
          error = "Opis jest wymagany";
        } else if (value.length < 20) {
          error = "Opis musi mieć minimum 20 znaków";
        } else if (value.length > 5000) {
          error = "Opis może mieć maksymalnie 5000 znaków";
        }
        break;

      case "startDate":
        if (!value) {
          error = "Data rozpoczęcia jest wymagana";
        } else if (new Date(value) < new Date()) {
          error = "Data rozpoczęcia nie może być z przeszłości";
        }
        break;

      case "endDate":
        if (!value) {
          error = "Data zakończenia jest wymagana";
        } else if (
          allFormData.startDate &&
          new Date(value) < new Date(allFormData.startDate)
        ) {
          error = "Data zakończenia musi być po dacie rozpoczęcia";
        }
        break;

      case "location":
        if (!value || value.trim().length === 0) {
          error = "Lokalizacja jest wymagana";
        } else if (value.length < 5) {
          error = "Lokalizacja musi mieć minimum 5 znaków";
        } else if (value.length > 200) {
          error = "Lokalizacja może mieć maksymalnie 200 znaków";
        }
        break;

      case "maxPeople":
        if (value && value <= 1) {
          error = "Limit uczestników musi większy niż 1";
        }
        break;

      case "price":
        if (value && value < 0) {
          error = "Cena nie może być ujemna";
        }
        break;

      case "website":
        if (value && value.trim().length > 0) {
          try {
            new URL(value);
          } catch {
            error = "Podaj poprawny adres URL (np. https://example.com)";
          }
        }
        break;

      case "organizerId":
        if (isAdmin && !value) {
          error = "Organizator jest wymagany";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = (formData, isAdmin = true) => {
    const errors = {};
    const requiredFields = [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
    ];

    if (isAdmin) {
      requiredFields.push("organizerId");
    }

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field], formData, isAdmin);
      if (error) errors[field] = error;
    });

    if (formData.maxPeople) {
      const error = validateField(
        "maxPeople",
        formData.maxPeople,
        formData,
        isAdmin,
      );
      if (error) errors["maxPeople"] = error;
    }

    if (formData.price) {
      const error = validateField("price", formData.price, formData, isAdmin);
      if (error) errors["price"] = error;
    }

    if (formData.website) {
      const error = validateField(
        "website",
        formData.website,
        formData,
        isAdmin,
      );
      if (error) errors["website"] = error;
    }

    return errors;
  };

  return { validateField, validateAll };
};
