import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* FIXED SIDEBAR */}
      <div className="w-64 fixed top-0 left-0 h-full z-20">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* CONTENT AREA */}
      <div className="ml-64 flex-1 p-6">
        {children(selectedTab, setSelectedTab)}
      </div>

    </div>
  );
}
