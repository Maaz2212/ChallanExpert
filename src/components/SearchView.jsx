import { Search, Clock } from "lucide-react";
// Imports removed


const SearchView = ({ vehicleNo, setVehicleNo, loading, handleSearch }) => (
  <div className="w-full">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <h3 className="text-lg font-semibold mb-4">Vehicle Challan Search</h3>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter Vehicle Number (e.g., MH05DS4747)"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  </div>
);

export default SearchView;