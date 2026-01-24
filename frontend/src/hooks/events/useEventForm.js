import { useEventValidation } from "./useEventValidation.js";
import { useForm } from "../useForm.js";

const EMPTY_FORM = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
  maxPeople: "",
  price: "",
  website: "",
  isOnline: false,
  organizerId: "",
};

export const useEventForm = ({ initialData = {}, onSubmit }) => {
  const { validateField, validateAll } = useEventValidation();

  return useForm({
    initialValues: { ...EMPTY_FORM, ...initialData },
    validateField,
    validateAll,
    onSubmit,
  });
};
