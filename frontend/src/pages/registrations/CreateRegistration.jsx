import { useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import RegistrationForm from "../../components/layout/form/RegistrationForm.jsx";
import { useNavigate } from "react-router-dom";
import { createRegistration } from "../../services/registrationService.js";

const CreateRegistration = () => {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      const registration = await createRegistration(formData);
      navigate(`/registrations/${registration.id}`);
    } catch (error) {
      console.error("Failed to create registration:", error.errors);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <Header />
      <RegistrationForm onSubmit={handleSubmit} backendErrors={backendErrors} />
      <Footer />
    </>
  );
};

export default CreateRegistration;
