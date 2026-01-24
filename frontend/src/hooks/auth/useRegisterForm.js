import { useRegisterValidation } from "./useRegisterValidation.js";
import { useForm } from "../useForm.js";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  description: "",
};

export const useRegisterForm = ({ initialData = {}, onSubmit }) => {
  const { validateField, validateAll } = useRegisterValidation();

  return useForm({
    initialValues: { ...EMPTY_FORM, ...initialData },
    validateField,
    validateAll,
    onSubmit,
  });
};
