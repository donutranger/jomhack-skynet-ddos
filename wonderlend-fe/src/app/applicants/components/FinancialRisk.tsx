const FinancialRisk = () => {
  const riskPercentage = 75; // This should be dynamic based on actual risk
  const highRiskWidth = `${riskPercentage}%`;
  const lessRiskWidth = `${100 - riskPercentage}%`;

  return (
    <div className="px-4 py-2 bg-white rounded-lg border shadow-md flex-1 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-md font-semibold text-gray-800">Financial Risk</h3>
        <div className="flex justify-between items-start gap-2 text-xs text-gray-600 mt-1">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-red-600 rounded-full mr-1"></span>
            High Risk
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-600 rounded-full mr-1"></span>
            Less Risk
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-semibold text-gray-800">
          {riskPercentage}%
        </div>
        <div className="w-fullrounded-full h-6 relative">
          <div
            className="bg-red-600 h-6 rounded-md absolute mr-1"
            style={{ width: highRiskWidth }}
          ></div>
          <div
            className="bg-green-600 h-6 rounded-md absolute ml-1"
            style={{ left: highRiskWidth, width: lessRiskWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FinancialRisk;
