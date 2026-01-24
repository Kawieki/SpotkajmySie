import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import EventForm from "../../components/layout/form/EventForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvent, updateEvent } from "../../services/eventService.js";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";
import { mapEventData } from "../../utils/BackendMapper.js";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent(id)
      .then((event) => {
        const mappedData = mapEventData(event);
        setEvent(mappedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      const eventData = {
        ...formData,
        organizerId:
          user.role === USER_ROLES.ORGANIZER ? user.id : formData.organizerId,
      };
      await updateEvent(id, eventData);
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Failed to update event:", error);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Header />
      <EventForm
        initialData={event}
        onSubmit={handleSubmit}
        isEdit={true}
        backendErrors={backendErrors}
      />
      <Footer />
    </>
  );
};

export default EditEvent;
