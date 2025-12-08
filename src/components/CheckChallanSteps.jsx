import React from "react";

export default function CheckChallanSteps() {
  const steps = [
    {
      title: "Search vehicle",
      subtitle: "Enter Vehicle Reg. No.",
      image: "/search-img.png", // update image names based on your public folder
    },
    {
      title: "View challan",
      subtitle: "Check Pending Fines",
      image: "/view.png",
    },
    {
      title: "Pay your challans",
      subtitle: "Settle your challans securely and hassle-free.",
      image: "/pay.png",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 fade-up">
          How to check challan online
        </h2>

        {/* Yellow underline */}
        <div className="w-24 h-1 mx-auto mt-4 mb-16 fade-up underline-animate"></div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-lg
                hover:shadow-xl
                transition-all duration-300
                fade-up
                cursor-pointer
                hover:-translate-y-2
              "
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-1 mb-6">{item.subtitle}</p>

              <img
                src={item.image}
                alt={item.title}
                className="w-full object-contain mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
