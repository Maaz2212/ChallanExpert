import React from "react";

export default function ChallanTable({ title, description, data }) {
  if (!data || data.length === 0) return null;

  // extract column names from first object keys
  const columns = Object.keys(data[0]);

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Optional description */}
        {description && (
          <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-md">
            
            {/* Header */}
            <thead className="bg-gray-800 text-white">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 text-left text-sm font-semibold">
                    {col.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="bg-white">
              {data.map((row, rIndex) => (
                <tr
                  key={rIndex}
                  className="border-b last:border-none hover:bg-gray-100 transition"
                >
                  {columns.map((col, cIndex) => (
                    <td key={cIndex} className="px-6 py-4 text-gray-700 text-sm">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}
