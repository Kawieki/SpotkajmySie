export const useRegistrationValidation = () => {
  const validateField = (name, value, isEdit = false) => {
    let error = "";

    switch (name) {
      case "userId":
        if (!isEdit && !value) {
          error = "Użytkownik jest wymagany";
        }
        break;

      case "eventId":
        if (!isEdit && !value) {
          error = "Wydarzenie jest wymagane";
        }
        break;

      case "status":
        if (value === "" || value === null || value === undefined) {
          error = "Status jest wymagany";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = (formData, isEdit = false) => {
    const errors = {};

    if (!isEdit) {
      const userError = validateField("userId", formData.userId, isEdit);
      if (userError) errors.userId = userError;

      const eventError = validateField("eventId", formData.eventId, isEdit);
      if (eventError) errors.eventId = eventError;
    }

    const statusError = validateField("status", formData.status, isEdit);
    if (statusError) errors.status = statusError;

    return errors;
  };

  return { validateField, validateAll };
};
