import { API_URL } from "../config";
import { authFetch } from "./authFetch.js";
import { sanitizeEventData } from "../utils/EventHelpers.js";

export const fetchEvents = async (page = 1, pageSize = 10) => {
  const response = await authFetch(
    `${API_URL}/events?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się pobrać wydarzeń");
  }

  return response.json();
};

export const fetchEvent = async (id) => {
  const response = await authFetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || "Nie udało się pobrać szczegółów wydarzenia",
    );
  }

  return response.json();
};

export const createEvent = async (eventData) => {
  const data = sanitizeEventData(eventData);

  const response = await authFetch(`${API_URL}/events`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.errors) {
      const error = new Error(errorData.detail || "Błąd walidacji");
      error.validationErrors = errorData.errors;
      throw error;
    }
    throw new Error(errorData.detail || "Nie udało się utworzyć wydarzenia");
  }

  return response.json();
};

export const updateEvent = async (id, eventData) => {
  const data = sanitizeEventData(eventData);
  const response = await authFetch(`${API_URL}/events/${id}`, {
    method: "PUT",
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
      errorData.detail || "Nie udało się zaktualizować wydarzenia",
    );
  }

  return response.json();
};

export const deleteEvent = async (id) => {
  const response = await authFetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Nie udało się usunąć wydarzenia");
  }

  return true;
};
