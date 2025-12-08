import React, { useEffect } from "react";

export default function WhyChooseUs() {
  const stats = [
    { value: "100%", label: "VERIFIED DATA" },
    { value: "10K+", label: "CHALLAN PAID" },
    { value: "0", label: "COURT VISITS" },
    { value: "20K+", label: "SATISFIED USERS" },
  ];

  // Scroll animation trigger
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="py-18 px-6 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 fade-up">
          <h2 className="text-5xl font-extrabold mb-4">Why choose Us</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Settle challans instantly across all states and cities in India without court visits.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-between gap-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="
                w-full sm:w-[48%] lg:w-[23%]
                cursor-pointer
                rounded-3xl
                py-12 px-6 text-center relative fade-up
                bg-gradient-to-br from-gray-800/50 via-gray-900/80 to-black
                shadow-[0_0_40px_4px_rgba(120,120,120,0.12)]
                hover:shadow-[0_0_70px_10px_rgba(180,180,180,0.15)]
                hover:-translate-y-6
                transition-all duration-300
              "
            >
              <div className="absolute inset-0 rounded-3xl border border-gray-500/20 pointer-events-none"></div>

              <div className="absolute top-1/2 left-1/2 w-[70%] h-[2px] bg-white/10 blur-sm -translate-x-1/2 -translate-y-1/2"></div>

              <h3 className="text-3xl font-semibold text-gray-100 mb-3">
                {item.value}
              </h3>
              <p className="text-gray-400 tracking-wide text-sm">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
