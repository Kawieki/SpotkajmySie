import { useEffect, useState } from "react";
import {
  fetchUsers,
  deleteUser,
  fetchUser,
} from "../../services/userService.js";
import { useAuth } from "../../context/AuthContext";
import { PAGE_SIZE } from "../../config.js";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers(page, PAGE_SIZE)
      .then((data) => {
        setUsers(data.items);
        setTotalCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      })
      .catch((err) => setError(err.message || "Wystąpił błąd"))
      .finally(() => setLoading(false));
  }, [page]);

  const { user, logout } = useAuth();

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));

      if (user && String(user.id) === String(id)) {
        logout();
        return;
      }

      if (users.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } catch (err) {
      setError(err.message ?? "Błąd usuwania");
      throw err;
    }
  };

  return {
    users,
    page,
    setPage,
    totalPages,
    totalCount,
    loading,
    error,
    removeUser,
  };
};

export const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchUser(id)
      .then((user) => setUser(user))
      .catch((err) => setError(err.message || "Wystąpił błąd"))
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
};
