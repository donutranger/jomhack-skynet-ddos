import Image from "next/image";

const CompanyName = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
      <h1 className="text-xl font-semibold">Booking.com Sdn Bhd</h1>
      <div className="flex gap-2">
        <button className="bg-blue-500 font-semibold text-white px-4 h-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-1">
          <Image src="/check.svg" alt="Approve" width={16} height={16} />
          Approve
        </button>
        <button className="bg-white font-semibold text-gray-600 px-4 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center gap-1">
          <Image src="/x.svg" alt="Approve" width={16} height={16} />
          Decline
        </button>
      </div>
    </div>
  );
};

export default CompanyName;
