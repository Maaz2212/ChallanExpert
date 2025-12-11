import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { fetchChallans } from "../api/challanApi";
import { normalizeChallan } from "../utils/normalizeApiChallan";
import { useSearchParams } from "react-router-dom";
import SearchView from "./SearchView";
import DashboardView from "./DashboardView";
import ChallanTableView from "./ChallanTableView";
import { formatDate } from "../utils/formatUtils";
import { getStatusColor } from "../utils/getStatusColor";

export default function ChallanExpertDashboard({ selectedTab }) {
  const [params] = useSearchParams();
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalChallans: 0,
    pendingChallans: 0,
    disposedChallans: 0,
    totalAmount: 0,
  });

  const fetchVehicleData = useCallback(async (vehicleNo) => {
    if (!vehicleNo) return;
    try {
      const response = await axios.get(`/api/vehicle/${vehicleNo}`);
      setVehicleData(response.data);
    } catch (error) {
      console.error("Vehicle info error:", error);
      setVehicleData(null);
    }
  }, []);

  const calculateStats = (challanData) => {
    const total = challanData.length;
    const pending = challanData.filter((c) => c.status === "Pending" || c.status === "Unpaid");
    const disposed = challanData.filter((c) => c.status === "Disposed" || c.status === "Paid");
    const totalAmt = pending.reduce((sum, c) => sum + c.amountNumber, 0);

    setStats({
      totalChallans: total,
      pendingChallans: pending.length,
      disposedChallans: disposed.length,
      totalAmount: totalAmt,
    });
  };

  const queryVehicle = params.get("vehicle");

  useEffect(() => {
    if (!queryVehicle) return;
    setVehicleNo(queryVehicle);
    handleSearch(queryVehicle);
  }, [queryVehicle]);

  const handleSearch = async (veh = vehicleNo) => {
    const v = veh.trim().toUpperCase();
    if (!v) return alert("Please enter a vehicle number");

    try {
      setLoading(true);
      setError("");

      await fetchVehicleData(v);
      const apiData = await fetchChallans(v);

      let normalized = apiData.map((c) => normalizeChallan(c));

      normalized = normalized.sort((a, b) => {
        if (!a.challanDateRaw) return 1;
        if (!b.challanDateRaw) return -1;
        return b.challanDateRaw - a.challanDateRaw;
      });

      normalized = normalized.map((c, i) => ({ ...c, serial: i + 1 }));

      setChallans(normalized);
      calculateStats(normalized);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch challan data");
      setChallans([]);
      setVehicleData(null);
    } finally {
      setLoading(false);
    }
  };



  // -------- RENDER BASED ON TAB --------
  if (selectedTab === "home") return <h1 className="text-2xl font-bold">Home Page</h1>;
  if (selectedTab === "search") return <SearchView vehicleNo={vehicleNo} setVehicleNo={setVehicleNo} loading={loading} handleSearch={handleSearch} challans={challans} />;
  if (selectedTab !== "dashboard") return <h1 className="text-xl">Coming Soon...</h1>;

  // Dashboard view
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Challan Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      {loading && (
        <div className="bg-gray-100 text-gray-700 p-3 rounded">Loading...</div>
      )}



      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <SearchView
            vehicleNo={vehicleNo}
            setVehicleNo={setVehicleNo}
            loading={loading}
            handleSearch={() => handleSearch(vehicleNo)}
          />
        </div>
        <div className="w-full lg:w-2/3">
          <DashboardView vehicleData={vehicleData} stats={stats} />
        </div>
      </div>

      {(challans.length > 0 || loading) && (
        <ChallanTableView
          challans={challans}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          vehicleNo={vehicleNo}
        />
      )}
    </div>
  );
}
