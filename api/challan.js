
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { vehicleNo } = req.body;

    const response = await fetch("https://api.invincibleocean.com/invincible/vehicleChallan", {
      method: "POST",
      headers: {
        clientId: process.env.API_CLIENT_ID,
        secretKey: process.env.API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleNumber: vehicleNo.toUpperCase(),
        chassisNumber: "dummy123",
        engineNumber: "dummy456",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
}
