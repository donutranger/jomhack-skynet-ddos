const CompanyName = () => {
    return (
        <div className="flex justify-between items-center p-4 shadow-md">
            <h1 className="text-xl font-bold">Booking.com Sdn Bhd</h1>
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-l hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Approve
                </button>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-r border border-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Decline
                </button>
            </div>
        </div>
    )
}

export default CompanyName