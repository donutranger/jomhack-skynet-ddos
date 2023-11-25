const FinancialRisk = () => {
    return (
        <div className="max-w-xs px-4 py-2 bg-white rounded-lg border shadow-sm">
            <h3 className="text-md font-semibold text-gray-800">Financial Risk</h3>
            <div className="text-2xl font-bold text-gray-800 my-2">75%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
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
    )
}

export default FinancialRisk