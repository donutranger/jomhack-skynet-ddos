const LoanDetails = () => {
  return (
    <div className="py-4 px-6 bg-white rounded-lg border shadow-md flex items-center">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Amount :</span> MYR 40,000
        </p>
        <p className="text-sm  text-gray-700 mt-1">
          <span className="font-semibold">Period :</span> 12 Months
        </p>
        <p className="text-sm  text-gray-700 mt-1">
          <span className="font-semibold">Loan Rate :</span> 9.67%
        </p>
      </div>
    </div>
  );
};

export default LoanDetails;
