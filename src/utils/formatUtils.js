export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  let date;
  // Handle DD/MM/YYYY, DD-MM-YYYY, or DD/MM/YYYY HH:mm:ss
  // The default JS constructor often fails with DD/MM/YYYY format
  const parts = dateString.split(/[\sT]+/)[0].split(/[\/\-]/);
  if (parts.length === 3) {
    // Assuming DD-MM-YYYY or DD/MM/YYYY based on localized input
    // Parts: [DD, MM, YYYY]
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // months are 0-indexed
    const year = parseInt(parts[2], 10);
    date = new Date(year, month, day);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
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
