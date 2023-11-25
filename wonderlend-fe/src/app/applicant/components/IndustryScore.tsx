const IndustryScore = () => {
    return (
        <div className="max-w-xs p-4 bg-white rounded-lg border shadow-md">
            <h3 className="text-md font-semibold text-gray-800">Industry Score</h3>
            <div className="flex items-center mt-2">
                <div className="flex-grow-1 text-2xl font-bold text-gray-800 mr-2">80%</div>
            </div>
            <div className="flex">
                <div className="text-sm font-semibold rounded-full p-1 bg-green-200 text-green-500 flex items-center">
                    ^
                    18%
                </div>
                &nbsp;
                <p className="text-sm text-gray-600 mt-1">from last quarter</p>
            </div>
        </div>
    );
}

export default IndustryScore