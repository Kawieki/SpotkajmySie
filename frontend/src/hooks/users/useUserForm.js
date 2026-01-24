import { useForm } from "../useForm.js";
import { useUserValidation } from "./useUserValidation.js";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  description: "",
};

export const useUserForm = ({ initialData = {}, onSubmit }) => {
  const { validateField, validateAll } = useUserValidation();

  return useForm({
    initialValues: { ...EMPTY_FORM, ...initialData },
    validateField,
    validateAll,
    onSubmit,
  });
};
