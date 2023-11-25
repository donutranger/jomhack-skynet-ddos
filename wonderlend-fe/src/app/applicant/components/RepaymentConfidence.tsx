const RepaymentConfidence = () => {
    const confidenceLevel = '88%'; // Example confidence level, this can be dynamic
    const confidenceColor = 'bg-green-500'; // Set the color based on the level of confidence

    return (
        <div className="max-w-xs px-4 py-2 bg-white rounded-lg border shadow-sm">
            <h3 className="text-md font-semibold text-gray-800">Confidence of Repayment</h3>
            <div className="text-2xl font-bold text-gray-800 my-2">{confidenceLevel}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className={`${confidenceColor} h-2.5 rounded-full`} style={{ width: confidenceLevel }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
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
    )
}

export default RepaymentConfidence