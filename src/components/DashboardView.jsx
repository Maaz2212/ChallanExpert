import { FileText, AlertTriangle, CheckCircle, IndianRupee } from "lucide-react";
import StatCard from "./StatCard";

const DashboardView = ({ vehicleData, stats }) => {
  if (!vehicleData) return null; // render nothing until vehicle data exists

  return (
    <div className="h-full">
      {/* Vehicle Stats Container */}
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-xl rounded-xl p-6 w-full h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Vehicle Challan Stats
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Challans"
            value={stats.totalChallans}
            icon={FileText}
            color="text-blue-600"
            subtext="All time records"
          />
          <StatCard
            title="Pending Challans"
            value={stats.pendingChallans}
            icon={AlertTriangle}
            color="text-red-600"
            subtext="Need attention"
          />
          <StatCard
            title="Disposed Challans"
            value={stats.disposedChallans}
            icon={CheckCircle}
            color="text-green-600"
            subtext="Completed"
          />
          <StatCard
            title="Total Amount"
            value={`₹${stats.totalAmount.toLocaleString("en-IN")}`}
            icon={IndianRupee}
            color="text-purple-600"
            subtext="Outstanding fines"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
