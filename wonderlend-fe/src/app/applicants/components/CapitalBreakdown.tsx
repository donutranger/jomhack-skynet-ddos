const CapitalBreakdown = () => {
  const data = [
    { name: "Haris", percentage: 38.6, color: "bg-blue-400" },
    { name: "Cradle", percentage: 30.8, color: "bg-green-400" },
    { name: "Kirill", percentage: 22.5, color: "bg-teal-400" },
    { name: "Antler", percentage: 8.1, color: "bg-purple-400" },
  ];

  return (
    <div className="flex-1 px-6 py-4 bg-white rounded-lg border shadow-sm flex flex-col gap-4">
      <h3 className="text-md font-semibold text-gray-800 mb-2">
        Capital Breakdown
      </h3>
      <div className="flex h-6 overflow-hidden gap-1">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`${item.color} flex-1 rounded-md`}
            style={{ flex: `0 0 ${item.percentage}%` }}
          ></div>
        ))}
      </div>
      <div className="flex gap-2 text-xs text-gray-600 mt-2">
        {data.map((item, idx) => (
          <div key={idx}>
            <span className="flex items-center">
              <span
                className={`h-2 w-2 ${item.color} rounded-full mr-1`}
              ></span>
              {item.name}&nbsp;{item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapitalBreakdown;
