import { API_URL } from "../config.js";
import { authFetch } from "./authFetch.js";

export const fetchUsers = async (page = 1, pageSize = 10) => {
  const response = await authFetch(
    `${API_URL}/users/?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) throw new Error("Nie udało się pobrać użytkowników");

  return response.json();
};

export const fetchUser = async (id) => {
  const response = await authFetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Nie udało się pobrać użytkownika");
  }

  return response.json();
};

export const createUser = async (userData) => {
  const response = await authFetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(errorData.detail || "Nie udało się utworzyć użytkownika");
  }

  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await authFetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(
      errorData.detail || "Nie udało się zaktualizować użytkownika",
    );
  }

  return response.json();
};

export const deleteUser = async (id) => {
  const response = await authFetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się usunąć użytkownika");
  }
  return true;
};

export const fetchOrganizers = async () => {
  const response = await authFetch(`${API_URL}/users?pageSize=1000`);

  if (!response.ok) {
    throw new Error("Nie udało się pobrać organizatorów");
  }

  const data = await response.json();
  return data.items.filter(
    (user) => user.role === "Organizer" || user.role === "Admin",
  );
};
