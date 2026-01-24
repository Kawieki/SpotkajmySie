export const getUserBadge = (role) => {
  if (role === "Admin") return "badge-error";
  if (role === "Organizer") return "badge-primary";
  return "badge-success";
};

export const getStatusBadge = (status) => {
  if (status === "Confirmed") return "badge-success";
  if (status === "Cancelled") return "badge-error";
  return "badge-primary";
};

export const getRoleLabel = (role) => {
  if (role === "Admin") return "Administrator";
  if (role === "Organizer") return "Organizator";
  return "Użytkownik";
};

export const getEventBadge = (isOnline) =>
  isOnline ? "badge badge-success" : "badge badge-primary";
