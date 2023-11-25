const ESGScore = () => {
    const score = 7; // Dynamically change this
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 10) * circumference;

    return (
        <div className="rounded-lg border shadow-md h-auto relative bg-white flex flex-row items-center">
            <div className="flex flex-col items-left p-4 min-w">
                <div className="text-xl font-semibold">ESG Score</div>
                <div className="text-sm text-gray-500">Overall</div>
            </div>
            <div className="flex items-center justify-center p-4 w-36">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    className="transform -rotate-90"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#f3f4f6"
                        strokeWidth="10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-3xl font-bold text-gray-800">{score}</div>
            </div>
        </div>
    );
}

export default ESGScore