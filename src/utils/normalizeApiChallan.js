import { cleanStr, capitalizeWords } from "./getStatusColor";
import { formatDate, parseChallanDate } from "./formatUtils";

export const normalizeChallan = (raw, index = 0) => {
  if (!raw) return null;

  // ---- Normalize Status ----
  // Priority: User mentioned 'challanStatus' in the new API response
  let statusRaw = cleanStr(raw.challanStatus || raw.payment_status || raw.status || raw.Status);
  let courtRaw = cleanStr(raw.court_status || raw.court);

  let status = "Pending"; // Default
  let court = "N/A";

  const sl = String(statusRaw).toLowerCase();
  const cl = String(courtRaw).toLowerCase();

  // Logic: "if court is 1 then its virtual court"
  if (cl === "1" || sl.includes("virtual") || sl.includes("court")) {
    court = "Virtual Court";
    status = "Pending"; // Virtual court imply pending adjudication
  } else {
    // "if court is "" then challan status is either pending or paid or unpaid"
    court = "N/A";

    if (sl === "paid" || sl === "1") {
      status = "Paid";
    } else if (sl === "unpaid" || sl === "0") {
      status = "Unpaid";
    } else if (sl === "pending") {
      status = "Pending";
    } else if (sl.includes("disp") || sl.includes("closed")) {
      status = "Disposed";
    } else {
      // Fallback/Heuristic
      const amount = Number.parseFloat(raw.amount) || 0;
      if (amount > 0) {
        status = "Unpaid"; // Assume unpaid if amount exists but status unknown
      } else {
        status = capitalizeWords(statusRaw || "Unknown");
      }
    }
  }

  // ---- Normalize Amount ----
  const amountNumber = Number.parseFloat(raw.amount) || 0;

  // ---- Normalize Date ----
  const parsedDate = parseChallanDate(raw.date || raw.challanDate);
  const formattedDate = formatDate(raw.date || raw.challanDate);

  return {
    // API fields normalized
    challanNumber: raw.challanNumber || raw.challan_no || "N/A",
    accusedName: raw.accusedName || raw.name || "N/A",
    fatherName: raw.accused_father_name || raw.father_name || "N/A", // Fixed mapping
    offenseDetails: raw.offenseDetails || raw.offence || raw.offense || "N/A",
    place: raw.challanPlace || raw.place || raw.location || "N/A", // Fixed mapping priority

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
