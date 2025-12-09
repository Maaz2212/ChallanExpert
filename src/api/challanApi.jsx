export const fetchChallans = async (vehicleNo) => {
  const res = await fetch("/api/challan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNo }),
  });

  const data = await res.json();

  // Handle error
  if (!Array.isArray(data.result)) {
    throw new Error(data.message || "No challans found");
  }

  return data.result;
};
