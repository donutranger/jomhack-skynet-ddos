const IndustryScore = () => {
    return (
        <div className="max-w-xs p-4 bg-white rounded-lg border shadow-sm">
            <h3 className="text-md font-semibold text-gray-800">Industry Score</h3>
            <div className="flex items-center mt-2">
                <div className="text-2xl font-bold text-gray-800 mr-2">80%</div>
                <div className="text-sm font-semibold text-green-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    18%
                </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">from last quarter</p>
        </div>
    );
}

export default IndustryScore