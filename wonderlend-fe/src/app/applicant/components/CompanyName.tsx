const CompanyName = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow">
            <h1 className="text-xl font-semibold text-gray-800">Booking.com Sdn Bhd</h1>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none hover:bg-blue-600">Approve</button>
                <button className="bg-white text-blue-500 px-6 py-2 rounded-lg border border-blue-500 focus:outline-none hover:bg-gray-100">Decline</button>
            </div>
        </div>
    )
}

export default CompanyName