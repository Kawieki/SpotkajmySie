import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import RegistrationForm from "../../components/layout/form/RegistrationForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRegistration,
  updateRegistration,
} from "../../services/registrationService.js";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";

const EditRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistration(id)
      .then((data) => {
        const mappedData = {
          userId: data.userId,
          eventId: data.eventId,
          status: data.status,
        };
        setRegistration(mappedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      await updateRegistration(id, { status: formData.status });
      navigate(`/registrations/${id}`);
    } catch (error) {
      console.error("Failed to update registration:", error);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Header />
      <RegistrationForm
        initialData={registration}
        onSubmit={handleSubmit}
        isEdit={true}
        backendErrors={backendErrors}
      />
      <Footer />
    </>
  );
};

export default EditRegistration;
