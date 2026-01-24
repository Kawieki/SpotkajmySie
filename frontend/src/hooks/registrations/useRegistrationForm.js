import { useRegistrationValidation } from "./useRegistrationValidation.js";
import { useForm } from "../useForm.js";
import { REGISTRATION_STATUS } from "../../config.js";

const EMPTY_FORM = {
  userId: "",
  eventId: "",
  status: REGISTRATION_STATUS.PENDING,
};

export const useRegistrationForm = ({
  initialData = {},
  onSubmit,
  isEdit = false,
}) => {
  const { validateField, validateAll } = useRegistrationValidation();

  return useForm({
    initialValues: { ...EMPTY_FORM, ...initialData },
    validateField: (name, value) => validateField(name, value, isEdit),
    validateAll: (formData) => validateAll(formData, isEdit),
    onSubmit,
  });
};
