import { cleanStr, capitalizeWords } from "./getStatusColor";
import { formatDate, parseChallanDate } from "./formatUtils";

export const normalizeChallan = (raw, index = 0) => {
  if (!raw) return null;

  // ---- Normalize Status ----
  let status = cleanStr(raw.payment_status || raw.status || raw.Status);
  const sl = status.toLowerCase();

  if (sl.includes("court")) {
    status = "Pending"; // court-challans are not paid yet
  } else if (sl === "1") {
    status = "Paid";
  } else if (sl === "0") {
    status = "Unpaid";
  } else if (sl.includes("disp") || sl.includes("closed")) {
    status = "Disposed";
  } else if (sl.includes("pending")) {
    status = "Pending";
  } else {
    status = capitalizeWords(status || "Unknown");
  }

  // ---- Normalize Court ----
  let court = cleanStr(raw.court_status || raw.court);
  if (!court || court === "0") court = "N/A";
  else if (court === "1") court = "Court";
  else court = capitalizeWords(court);

  // ---- Normalize Amount ----
  const amountNumber = Number.parseFloat(raw.amount) || 0;

  // ---- Normalize Date ----
  const parsedDate = parseChallanDate(raw.date || raw.challanDate);
  const formattedDate = formatDate(raw.date || raw.challanDate);

  return {
    // API fields normalized
    challanNumber: raw.challanNumber || raw.challan_no || "N/A",
    accusedName: raw.accusedName || raw.name || "N/A",
    fatherName: raw.fatherName || raw.father_name || "N/A",
    offenseDetails: raw.offenseDetails || raw.offence || raw.offense || "N/A",
    place: raw.place || raw.location || "N/A",

    // Dates
    challanDate: formattedDate,
    challanDateRaw: parsedDate,

    // Status
    status,
    court,

    // Amount
    amountNumber,
    amountDisplay: `₹${amountNumber.toLocaleString("en-IN")}`,

    // Misc
    state: raw.state || "N/A",
    rto: raw.rto || "N/A",
    image_url: raw.image_url || null,

    // table numbering will be injected later
    serial: index + 1,
  };
};
