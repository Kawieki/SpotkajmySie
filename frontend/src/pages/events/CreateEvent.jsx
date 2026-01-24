import { useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import EventForm from "../../components/layout/form/EventForm.jsx";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/eventService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      const eventData = {
        ...formData,
        organizerId:
          user.role === USER_ROLES.ORGANIZER ? user.id : formData.organizerId,
      };
      const event = await createEvent(eventData);
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Failed to create event:", error);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <Header />
      <EventForm
        initialData={
          user.role === USER_ROLES.ORGANIZER ? { organizerId: user.id } : {}
        }
        onSubmit={handleSubmit}
        backendErrors={backendErrors}
      />
      <Footer />
    </>
  );
};

export default CreateEvent;
