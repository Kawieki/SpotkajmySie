export const mapEventData = (data) => {
  return {
    title: data.title || "",
    description: data.description || "",
    startDate: data.startDate
      ? new Date(data.startDate).toISOString().slice(0, 16)
      : "",
    endDate: data.endDate
      ? new Date(data.endDate).toISOString().slice(0, 16)
      : "",
    location: data.location || "",
    maxPeople: data.maxPeople || "",
    price: data.price || "",
    website: data.website || "",
    isOnline: data.isOnline || false,
    organizerId: data.organizer?.id || "",
  };
};

export const mapUserData = (data) => {
  return {
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    description: data.description || "",
    role: data.role || "",
  };
};
