const RepaymentConfidence = () => {
  const confidenceLevel = 88; // Dynamic
  const getTextColorClass = (level: number) => {
    if (level < 50) return "text-red-600";
    if (level < 80) return "text-yellow-400";
    return "text-green-600";
  };
  const textColorClass = getTextColorClass(confidenceLevel);

  return (
    <div className="px-6 py-4 bg-white rounded-lg border shadow-md flex flex-col gap-7">
      <h3 className="text-md font-semibold text-gray-800">
        Confidence of Repayment
      </h3>
      <div className="flex flex-col gap-2">
        <div className={`text-3xl font-semibold ${textColorClass}`}>
          {confidenceLevel}%
        </div>

        <div className="flex justify-between text-xs text-gray-600 gap-2">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-red-600 rounded-full mr-1"></span>
            0-49% - Low
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-yellow-400 rounded-full mr-1"></span>
            50-79% - Medium
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
            80-100% - High
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepaymentConfidence;
