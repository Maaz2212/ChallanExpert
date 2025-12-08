import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "In what time an e-challan needs to be paid?",
    a: "Usually, an e-challan needs to be paid within 60 days from the date it is issued.",
  },
  {
    q: "Which is the convenient way of paying e-challan?",
    a: "The quickest and most convenient way is paying online through trusted portals.",
  },
  {
    q: "When does an e-challan move to a virtual court?",
    a: "If the e-challan remains unpaid for 60 days, it automatically moves to the virtual court.",
  },
  {
    q: "How can I get maximum discounts on my e-challans?",
    a: "We run special offer periods that give people an excellent opportunity to settle their challans at discounted legal fees.",
  },
  {
    q: "Can an e-challan be challenged?",
    a: "Yes, a wrongly issued e-challan can be challenged.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        FAQs – E Challan
      </h2>

      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div
            key={i}
           className="border border-gray-200 p-4 rounded-xl bg-white hover:shadow-md transition cursor-pointer"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{item.q}</span>
              <ChevronDown
                className={`transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`mt-3 text-gray-700 transition-all overflow-hidden ${
                openIndex === i ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="pt-2">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
