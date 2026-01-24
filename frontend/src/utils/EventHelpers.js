export const sanitizeEventData = (data) => {
  const copy = { ...data };

  if (copy.maxPeople === "") {
    copy.maxPeople = null;
  } else {
    const n = Number(copy.maxPeople);
    copy.maxPeople = Number.isNaN(n) ? null : n;
  }

  if (copy.price === "") {
    copy.price = null;
  } else {
    const p = Number(copy.price);
    copy.price = Number.isNaN(p) ? null : p;
  }

  if (copy.organizerId === "") {
    copy.organizerId = null;
  } else {
    const o = Number(copy.organizerId);
    copy.organizerId = Number.isNaN(o) ? null : o;
  }

  copy.isOnline = Boolean(copy.isOnline);

  return copy;
};
