import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Vipul Verma",
    title: "Paid challan via ChallanExpert • Verified User",
    review: "Paid my challan online in minutes—no queues, no hassle. Thanks, ChallanExpert!",
    date: "2025-09-30",
    rating: 5,
  },
  {
    name: "Hardik Sharma",
    title: "Paid challan via ChallanExpert • Verified User",
    review: "Smooth process! Quick payment and instant confirmation. Highly recommended.",
    date: "2025-05-05",
    rating: 4,
  },
  {
    name: "Arbaz Khan",
    title: "Paid challan via ChallanExpert • Verified User",
    review: "Easy challan lookup and payment—saved me so much time!",
    date: "2025-04-30",
    rating: 5,
  },
  {
    name: "Priya Singh",
    title: "Verified User",
    review: "Super convenient platform. I could check all challans of my car in seconds.",
    date: "2025-02-18",
    rating: 4,
  },
  {
    name: "Arshad Ali",
    title: "Verified User",
    review: "Accurate challan details and seamless UX. Loved it!",
    date: "2025-01-20",
    rating: 5,
  },
];

export default function Testimonials() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-4">
        Testimonials
        <div className="flex-1 h-[2px] bg-gray-500"></div>
      </h2>

      {/* Slider Wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="
            absolute left-[-20px] top-1/2 -translate-y-1/2
            bg-white shadow-xl rounded-full w-12 h-12 
            flex items-center justify-center
            hover:scale-110 transition z-50
          "
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Cards Container */}
        <div
          ref={sliderRef}
          className="
            flex gap-6 overflow-x-auto scroll-smooth no-scrollbar
            pb-4 pt-2
          "
        >
          {testimonials.map((t, i) => (
            <ReviewCard key={i} data={t} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="
            absolute right-[-20px] top-1/2 -translate-y-1/2
            bg-white shadow-xl rounded-full w-12 h-12
            flex items-center justify-center
            hover:scale-110 transition z-50
          "
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
}

function ReviewCard({ data }) {
  return (
    <div
      className="
        min-w-[350px] max-w-[350px]
        bg-white border border-gray-200 rounded-2xl
        p-5 shadow-sm hover:shadow-md transition
      "
    >
      <div className="flex items-center gap-3 mb-2">
        {/* Initial Bubble */}
        <div className="
          w-12 h-12 rounded-full bg-indigo-200 
          flex items-center justify-center 
          text-lg font-semibold text-gray-700
        ">
          {data.name.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">{data.name}</h3>
          <p className="text-sm text-amber-700 font-medium">{data.title}</p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed mb-4">{data.review}</p>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: data.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Date */}
      <div className="text-xs text-gray-500">{data.date}</div>
    </div>
  );
}
