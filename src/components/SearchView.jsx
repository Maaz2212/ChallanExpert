import { Search, Clock } from "lucide-react";
import ChallanTableView from "./ChallanTableView";
import { formatDate } from "../utils/formatUtils";
import { getStatusColor } from "../utils/getStatusColor";


const SearchView = ({ vehicleNo, setVehicleNo, loading, handleSearch, challans }) => (
    <div className="space-y-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-3/6">
        <h3 className="text-lg font-semibold mb-4">Vehicle Challan Search</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter Vehicle Number (e.g., MH05DS4747)"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {(challans.length > 0 || loading) && (<ChallanTableView 
      challans={challans}
      formatDate={formatDate}
      getStatusColor={getStatusColor}
      vehicleNo={vehicleNo}
      />)}
    </div>
  );

export default SearchView;