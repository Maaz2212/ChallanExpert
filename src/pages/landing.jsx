import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CheckCircle, Shield, Zap, Search, Car,IndianRupee, Menu, X } from "lucide-react";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import ChallanTable from "../components/ChallanInfoTable";
import CheckChallanSteps from "../components/CheckChallanSteps";
import Testimonials from "../components/Testimonials";
import AnimatedHeroSection from "../components/HeroSection"

export default function Landing() {
  const [vehicleNo, setVehicleNo] = useState("");
  const invalidDocsData = [
  { Offence: "Driving without a valid license", Penalty1st: "500", Penalty2nd: "5,000" },
  { Offence: "Underage driver", Penalty1st: "25,000 / 3 years jail", Penalty2nd: "-" },
  { Offence: "Driving without registration", Penalty1st: "2,000 - 5,000", Penalty2nd: "5,000 - 10,000 / 1-year jail" },
  { Offence: "Driving without PUCC", Penalty1st: "10,000 + jail", Penalty2nd: "-" },
  ];

  const topTrafficOffences = [
  { offence: "Overloading", first: "20,000 + 2,000 (per extra ton)", second: "-" },
  { offence: "Dangerous/rash driving", first: "1,000 or 1-year imprisonment", second: "10,000 + 2-year imprisonment" },
  { offence: "Using mobile phones while driving", first: "500", second: "5,000" },
  { offence: "Overspeeding", first: "500", second: "5,000" },
  { offence: "Drunken driving/abetment", first: "1,000 - 1,500", second: "10,000 or 6-month imprisonment" },
  { offence: "Riding without helmet", first: "100", second: "1,000 and license scrapping for 3 months" },
  { offence: "Driving without seatbelt", first: "100", second: "1,000" },
  ];
  
  const [recent, setRecent] = useState(() => {
  const saved = localStorage.getItem("recentSearches");
  return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();
  const { user } = useAuth();
 
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = vehicleNo.trim().toUpperCase();
    if (!trimmed) {
      alert("Please enter a vehicle number");
      return;
    }

    const updated = [trimmed, ...recent.filter((v) => v !== trimmed)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    if (!user) {
      navigate(`/login?redirect=/dashboard&vehicle=${encodeURIComponent(trimmed)}`);
      return;
    }

    navigate(`/dashboard?vehicle=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}, []);


  return (
    <div className="min-h-screen flex flex-col font-inter scroll-smooth">
      {/* Header */}
      <Navbar/>  

      {/* Home Section */}
      <section id="home">
  <AnimatedHeroSection
    vehicleNo={vehicleNo}
    setVehicleNo={setVehicleNo}
    recent={recent}
    setRecent={setRecent}
    handleSearch={handleSearch}
  />
</section>


      {/* About Section */}
      <section
  id="about"
  className="
    max-w-6xl mx-auto px-6 py-24
    grid md:grid-cols-2 gap-16
    items-start
  "
>
  {/* LEFT SIDE — BOTH TEXT BLOCKS */}
  <div className="space-y-16">
    
    {/* About ChallanExpert */}
    <div>
      <h3 className="text-3xl font-bold text-gray-800 mb-4 fade-up">
        About ChallanExpert
      </h3>
      {/* Gray underline */}
      <div className="underline-animate mb-6 fade-up"></div>

      <p className="text-gray-600 text-xl leading-relaxed fade-up">
        ChallanExpert is a unified platform built to simplify how individuals and
        organizations manage vehicle challans. We automate record tracking, offer
        real-time updates, and ensure you never miss a payment or deadline again.
      </p>
    </div>

    {/* What is an E-challan */}
    <div>
      <h3 className="text-3xl font-bold text-gray-800 mb-3 fade-up">
        What is an E-challan?
      </h3>

      {/* Gray underline like screenshot */}
      <div className="underline-animate mb-6 fade-up"></div>

      <p className="text-gray-600 leading-relaxed fade-up text-xl">
        An e-challan, short for electronic challan, is a digitally generated fine issued
        by traffic authorities to road users who violate traffic rules, as per the
        provisions provided under the Motor Vehicles Act 1988. The e-challan system
        replaces the traditional paper-based challans and leverages CCTV surveillance and
        automated speed detectors to capture real-time offences.
      </p>
    </div>

  </div>

  {/* RIGHT SIDE — IMAGE WITH FLOAT + HOVER */}
  {/* RIGHT SIDE — TWO FLOATING IMAGES */}
<div className="flex flex-col justify-center items-center gap-12">

  {/* Image 1 */}
  <div className="p-3 border-4 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md float-hover float-animation">
    <img
      src="/image.png"
      alt="Challan management"
      className="w-80 md:w-96 rounded-xl object-contain"
    />
  </div>

  {/* Image 2 (New) */}
  <div className="p-3 border-4 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md float-hover float-animation">
    <img
      src="/check-challan.png"
      alt="Check Challan"
      className="w-80 md:w-96 rounded-xl object-contain"
    />
  </div>
</div>
</section>
      
      <section id="how-to-check">
         <CheckChallanSteps />
      </section>

      <section id="testimonials">
       <Testimonials />
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-3 fade-up">Our Services</h3>
          <p className="text-gray-600 fade-up">What makes ChallanExpert the most reliable challan management tool.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto fade-up">
          <ServiceCard icon={<Car className="w-8 h-8 text-indigo-600" />} title="Vehicle Lookup" text="Instantly retrieve challan details by vehicle number across all RTOs." />
          <ServiceCard icon={<Shield className="w-8 h-8 text-indigo-600" />} title="Secure Access" text="Your data stays encrypted, safe, and accessible only to you." />
          <ServiceCard icon={<Zap className="w-8 h-8 text-indigo-600" />} title="Real-Time Alerts" text="Get notified as soon as a new challan is issued or updated." />
          <ServiceCard icon={<IndianRupee className="w-8 h-8 text-indigo-600" />} title="Cheap Settlement" text="Settle your challan quickly and affordably with minimal hassle." />
        </div>
      </section>

      <ChallanTable
       title="Invalid Documents Offences"
       description="Penalties may vary based on state rules."
       data={invalidDocsData}
       className = "fade-up"
      />

      <ChallanTable
      title="Top Traffic Offences & Penalties in India"
      description="Staying informed about the latest traffic violations in India is crucial."
      data={topTrafficOffences}
      className = "fade-up"
      />


      {/* Benefits Section */}
      <section id="benefits">
          <WhyChooseUs />
      </section>

      <section id="faq">
          <Faq />
      </section>
      
      {/* Footer */}
      <Footer />
      <a
         href="https://wa.me/9839390906"
         target="_blank"
         rel="noopener noreferrer"
         className="
         fixed
         bottom-6 right-6
         z-50
       bg-[#25D366]
         w-14 h-14     
         rounded-full
         flex items-center justify-center
         shadow-lg
         hover:scale-110
         transition-transform duration-300
         "
         >
      <img 
    src="/whatsapp.svg" 
    alt="WhatsApp"
    className="w-8 h-8"
      />
      </a>
    </div>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg flex flex-col items-center text-center hover:scale-110 transition-transform duration-300">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
