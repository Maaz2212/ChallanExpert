export const getStatusColor = (status = "") => {
  const s = status.toLowerCase();
  switch (s) {
    case "paid":
    case "disposed":
      return "text-green-700 bg-green-100";
    case "pending":
    case "unpaid":
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

export const capitalizeWords = (s = "") =>
  String(s).replace(/\b\w/g, (m) => m.toUpperCase());

export const cleanStr = (v) => {
  if (!v) return "";
  const s = String(v).trim().toLowerCase();
  return ["na", "n/a", "null", "-", "undefined"].includes(s) ? "" : v;
};
