import React, { useState } from "react";
import EventItem from "../../common/Items/EventItem.jsx";
import Pagination from "../../common/Pagination.jsx";
import { useEvents } from "../../../hooks/events/useEvents.js";
import LoadingPage from "../../../pages/LoadingPage.jsx";
import ErrorPage from "../../../pages/ErrorPage.jsx";
import { signForEvent } from "../../../services/registrationService.js";
import { useNavigate } from "react-router-dom";
import FormErrors from "../form/FormErrors.jsx";

const EventsList = () => {
  const { events, page, totalPages, setPage, loading, error } = useEvents();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const handleClick = async (userId, eventId) => {
    try {
      const registration = await signForEvent(userId, eventId);
      navigate(`/registrations/${registration.id}`);
    } catch (err) {
      setErrors(err);
      window.scrollTo({ top: 0 });
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div>
      {errors && <FormErrors backendErrors={errors} />}

      {events.map((event) => (
        <EventItem key={event.id} event={event} handleClick={handleClick} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EventsList;
