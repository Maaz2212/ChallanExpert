export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  let normalized = dateString.replace(/\/|-/g, "-");
  let date = new Date(normalized);

  // fallback for DD-MM-YYYY
  if (isNaN(date.getTime())) {
    const [d, m, y] = normalized.split("-");
    if (d?.length <= 2 && m?.length <= 2 && y?.length === 4) {
      date = new Date(`${y}-${m}-${d}`);
    }
  }

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const parseChallanDate = (dateString) => {
  if (!dateString) return null;

  let normalized = dateString.replace(/\/|-/g, "-");
  let date = new Date(normalized);

  // fallback DD-MM-YYYY
  if (isNaN(date.getTime())) {
    const [d, m, y] = normalized.split("-");
    if (d?.length <= 2 && m?.length <= 2 && y?.length === 4) {
      date = new Date(`${y}-${m}-${d}`);
    }
  }

  return isNaN(date.getTime()) ? null : date;
};
