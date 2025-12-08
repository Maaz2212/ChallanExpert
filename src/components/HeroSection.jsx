import { useState, useEffect } from "react";
import { Search, AlertCircle, CheckCircle, Clock, Shield } from "lucide-react";

export default function AnimatedHeroSection({
  vehicleNo,
  setVehicleNo,
  recent,
  handleSearch,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: <CheckCircle className="w-5 h-5" />, text: "50,000+ Challans Resolved", color: "text-green-400" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Instant Updates", color: "text-blue-400" },
    { icon: <Shield className="w-5 h-5" />, text: "100% Secure Payment", color: "text-purple-400" },
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="hero-wrapper relative">

      {/* BACKGROUND ELEMENTS */}
      <div className="hero-bg-elements">
        <div className="road-lines">
          <div className="line" /><div className="line" /><div className="line" /><div className="line" />
        </div>

        <div className="floating-icons">
          <AlertCircle className="icon icon-1" size={40} />
          <CheckCircle className="icon icon-2" size={35} />
          <Shield className="icon icon-3" size={38} />
          <Clock className="icon icon-4" size={36} />
        </div>

        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <div className="text-3xl mb-6">
          <h2 className="hero-bottom-title animate-bounce-slow">
            <span className="gradient3">Your Challan, Our Responsibility</span>
          </h2>
        </div>

        <div className="hero-badge animate-fade-in">
          <span className="badge-dot" />
          <span className="text-white text-sm font-medium">India's Most Trusted Challan Platform</span>
        </div>

        <h1 className="hero-title animate-slide-up">
          <span className="gradient1">Simplify Your</span><br />
          <span className="gradient2">Vehicle Challan</span>
        </h1>

        <p className="hero-subtitle animate-fade-in-delay">
          Track, manage & settle traffic challans across all Indian states —
          <span className="text-yellow-400 font-semibold"> instantly</span>
        </p>

        <div className="hero-stats animate-fade-in-delay-2">
          <div className={`flex items-center justify-center gap-2 transition-all duration-500 ${stats[currentStat].color}`}>
            {stats[currentStat].icon}
            <span className="font-semibold">{stats[currentStat].text}</span>
          </div>
        </div>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} className="hero-form animate-slide-up-delay">
          <div className="relative group hero-form-box">
            <div className="glow-border"></div>

            <div className="relative bg-white flex flex-col sm:flex-row gap-3 p-2 rounded-2xl shadow-2xl">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter Vehicle Number (e.g., DL01AB1234)"
                  className="hero-input"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />

                {showSuggestions && recent.length > 0 && (
                  <div className="recent-box animate-dropdown">
                    <p className="recent-title">Recent Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {recent.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className="recent-btn"
                          onClick={() => {
                            setVehicleNo(item);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="hero-search-btn">
                <span className="relative z-10 flex items-center gap-2">
                  <Search className="w-5 h-5" /> Search
                </span>
                <div className="btn-shine"></div>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 📞 FIXED BOTTOM CONTACT CTA */}
      <div className="
        absolute bottom-4 left-1/2 transform -translate-x-1/2 
        text-center w-[90%] sm:w-auto z-20
      ">
        <p className="text-white text-sm md:text-base mb-2 opacity-90">
          Need assistance? Our team is here to help.
        </p>
        <a
          href="tel:8303959909"
          className="
            inline-block bg-gradient-to-r from-blue-600 to-purple-600 
            text-white px-5 py-3 rounded-xl font-semibold shadow-lg 
            hover:scale-105 transition-all text-sm md:text-base
          "
        >
          Call Customer Care @ 8303959909
        </a>
      </div>

    </div>
  );
}
