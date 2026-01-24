import { useEffect, useState } from "react";
import {
  deleteRegistration,
  fetchRegistration,
  fetchRegistrations,
} from "../../services/registrationService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { PAGE_SIZE } from "../../config.js";

export const useRegistrations = () => {
  const { user } = useAuth();

  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchRegistrations({
      role: user.role,
      page,
      PAGE_SIZE,
    })
      .then((data) => {
        setRegistrations(data.items);
        setTotalCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      })
      .catch((err) => setError(err.message ?? err))
      .finally(() => setLoading(false));
  }, [user, page]);

  const removeRegistration = async (id) => {
    try {
      await deleteRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message ?? "Błąd usuwania");
      throw err;
    }
  };

  return {
    registrations,
    page,
    totalPages,
    totalCount,
    setPage,
    error,
    loading,
    removeRegistration,
  };
};

export const useRegistration = (id) => {
  const [registration, setRegistration] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistration(id)
      .then((reg) => setRegistration(reg))
      .catch((err) => setError(err.message || "Wystąpił błąd"))
      .finally(() => setLoading(false));
  }, [id]);

  return { registration, error, loading };
};
