const CapitalBreakdown = () => {
    const data = [
        { name: 'Haris', percentage: 38.6, color: 'bg-blue-400' },
        { name: 'Cradle', percentage: 30.8, color: 'bg-green-400' },
        { name: 'Kirill', percentage: 22.5, color: 'bg-teal-400' },
        { name: 'Antler', percentage: 8.1, color: 'bg-purple-400' },
    ];

    return (
        <div className="max-w-lg px-4 py-2 bg-white rounded-lg border shadow-sm">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Capital Breakdown</h3>
            <div className="flex h-4 rounded-full overflow-hidden">
                {data.map((item, idx) => (
                    <div key={idx} className={`${item.color} flex-1`} style={{ flex: `0 0 ${item.percentage}%` }}>
                        <span className="text-xs text-white">{item.name} {item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CapitalBreakdown