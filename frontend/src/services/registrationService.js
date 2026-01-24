import { API_URL } from "../config";
import { authFetch } from "./authFetch.js";
import { USER_ROLES } from "../config";

export const fetchRegistrations = async ({ role, page = 1, pageSize = 10 }) => {
  let endpoint = "/registrations";

  if (role === USER_ROLES.USER) {
    endpoint = "/registrations/my";
  }

  if (role === USER_ROLES.ORGANIZER) {
    endpoint = "/registrations/organizer";
  }

  const response = await authFetch(
    `${API_URL}${endpoint}?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się pobrać rejestracji");
  }

  return response.json();
};

export const fetchRegistration = async (id) => {
  const response = await authFetch(`${API_URL}/registrations/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się pobrać rejestracji");
  }

  return response.json();
};

export const deleteRegistration = async (id) => {
  const response = await authFetch(`${API_URL}/registrations/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się usunąć rejestracji");
  }

  return true;
};

export const createRegistration = async (data) => {
  const response = await authFetch(`${API_URL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(errorData.detail || "Nie udało się utworzyć rejestracji");
  }

  return response.json();
};

export const signForEvent = async (userId, eventId) => {
  const response = await authFetch(`${API_URL}/registrations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: eventId,
      userId: userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(errorData.detail || "Nie udało się zapisać na wydarzenie");
  }

  return response.json();
};

export const updateRegistration = async (id, data) => {
  const response = await authFetch(`${API_URL}/registrations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(
      errorData.detail || "Nie udało się zaktualizować rejestracji",
    );
  }

  return response.json();
};
