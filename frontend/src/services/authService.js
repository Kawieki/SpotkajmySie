import { AUTH_BASE } from "../config";

export const registerUser = async (userData) => {
  const response = await fetch(`${AUTH_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Rejestracja nie powiodła się");
  }

  return response.text();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Nieprawidłowy e-mail lub hasło");
  }

  return response.json();
};
