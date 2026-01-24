import { useState } from "react";

export const useForm = ({
  initialValues,
  validateField,
  validateAll,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (validateField) {
      const error = validateField(name, value, nextFormData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll) {
      onSubmit(formData);
      return;
    }

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
