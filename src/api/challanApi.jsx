import { normalizeChallan } from "../utils/normalizeApiChallan";
import { parseChallanDate } from "../utils/formatUtils";

// Load environment variables
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  clientId: import.meta.env.VITE_API_CLIENT_ID,
  secretKey: import.meta.env.VITE_API_SECRET_KEY,
};

export const fetchChallans = async (vehicleNo) => {
  const res = await fetch(API_CONFIG.baseURL, {
    method: "POST",
    headers: {
      clientId: API_CONFIG.clientId,
      secretKey: API_CONFIG.secretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vehicleNumber: vehicleNo.toUpperCase(),
      chassisNumber: "dummy123",
      engineNumber: "dummy456",
    }),
  });

  const data = await res.json();

  if (data.code !== 200 || !Array.isArray(data.result))
    throw new Error(data.message || "No challans found");

  const normalized = data.result.map(normalizeChallan);

  return normalized.sort((a, b) => {
    const da = parseChallanDate(a.challanDate);
    const db = parseChallanDate(b.challanDate);
    return (db || 0) - (da || 0);
  });
};
