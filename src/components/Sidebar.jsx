import { Car, TrendingUp, Search, FileText, Users, Settings, Phone, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ selectedTab, setSelectedTab }) {

  const navigate = useNavigate();
  const handleClick = (item) => {
    if (item.id === "home") {
      navigate("/");             // 🔥 redirect to Landing page
      return;
    }
    setSelectedTab(item.id);
  };

  return (
    <div className="bg-white shadow-lg border-r border-gray-200 w-64 h-full flex flex-col">
      
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
        <div className="h-18 w-15 mr-3">
         <img src="/challan.png" alt="logo" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Challan Expert</h1>
          <p className="text-xs text-gray-500">Traffic Management Portal</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-6 flex-1">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "dashboard", label: "Dashboard", icon: TrendingUp },
          { id: "search", label: "Vehicle Search", icon: Search },
          { id: "challans", label: "Challan Records", icon: FileText },
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "customers", label: "Customers", icon: Users },
          { id: "settings", label: "Settings", icon: Settings },
        ].map((item) => (
           <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              selectedTab === item.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      {/* CONTACT BLOCK */}
      <div className="border-t border-gray-200 p-5">
        <div className="flex items-center text-gray-600 mb-2">
          <Phone className="h-5 w-5 mr-2 text-blue-600" />
          <span className="font-semibold">Talk To Us</span>
        </div>
        <a
          href="tel:8303959909"
          className="block text-blue-600 font-bold hover:underline"
        >
          83039 59909
        </a>
      </div>

    </div>
  );
}
