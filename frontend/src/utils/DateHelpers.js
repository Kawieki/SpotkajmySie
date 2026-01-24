export const formatDate = (isoString) => {
  let date = new Date(isoString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let parts = date.split(" ");
  return {
    day: parts[0],
    month: parts[1],
    year: parts[2],
  };
};

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const formatDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const sameDay = startDate.toDateString() === endDate.toDateString();

  const date = formatDateTime(start).split(" ")[0];
  const startTime = formatDateTime(start).split(" ")[1];
  const endTime = formatDateTime(end).split(" ")[1];

  return sameDay
    ? `${date} ${startTime}–${endTime}`
    : `${formatDateTime(start)} – ${formatDateTime(end)}`;
};

export const getEventType = (isOnline) => (isOnline ? "Online" : "Na żywo");
