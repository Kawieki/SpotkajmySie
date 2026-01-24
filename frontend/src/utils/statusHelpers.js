import { REGISTRATION_STATUS } from "../config.js";

export function getRegistrationLabel(status) {
  if (status === null || status === undefined) return "Nieznany";
  const s = String(status);
  if (s === REGISTRATION_STATUS.CONFIRMED) return "Potwierdzona";
  if (s === REGISTRATION_STATUS.CANCELLED) return "Anulowana";
  if (s === REGISTRATION_STATUS.PENDING) return "Oczekująca";
  return s;
}

export function getRegistrationBadgeClass(status) {
  const s = String(status);
  if (s === REGISTRATION_STATUS.CONFIRMED) return "badge-success";
  if (s === REGISTRATION_STATUS.CANCELLED) return "badge-error";
  if (s === REGISTRATION_STATUS.PENDING) return "badge-warning";
  return "badge-secondary";
}
