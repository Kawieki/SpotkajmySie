import { useEffect, useState } from "react";
import { fetchEvent, fetchEvents } from "../../services/eventService.js";
import { PAGE_SIZE } from "../../config.js";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents(page)
      .then((data) => {
        setEvents(data.items);
        setTotalCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      })
      .catch((err) => setError(err.message || "Wystąpił błąd"))
      .finally(() => setLoading(false));
  }, [page]);

  const removeEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
  };

  return {
    events,
    page,
    totalPages,
    setPage,
    loading,
    error,
    totalCount,
    removeEvent,
  };
};

export const useEvent = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent(id)
      .then((event) => setEvent(event))
      .catch((err) => setError(err.message || "Wystąpił błąd"))
      .finally(() => setLoading(false));
  }, [id]);

  return { loading, error, event };
};
