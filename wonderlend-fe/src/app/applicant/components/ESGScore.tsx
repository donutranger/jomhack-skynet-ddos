const ESGScore = () => {
    const strokeDasharray = 2 * Math.PI * 50; // This should be the circumference of the circle (2 * π * radius)
    const strokeDashoffset = strokeDasharray - strokeDasharray * 7 / 10; // Assuming the score is 7 out of 10 for ESG Score

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border shadow-sm w-44 h-24">
            <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f3f4f6" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#10b981" strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            <div className="absolute">
                <span className="text-3xl font-bold text-gray-800">7</span>
            </div>
            <div className="text-sm text-gray-500">Overall</div>
        </div>
    );
}

export default ESGScore