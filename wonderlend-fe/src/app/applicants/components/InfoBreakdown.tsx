const InfoBreakdown = () => {
  return (
    <div className="max-full px-6 py-4 bg-white rounded-lg border shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-gray-800">Info Breakdown</h3>
      <div>
        <p className="font-semibold text-gray-800">Market position rating:</p>
        <p className="text-gray-600">
          The company holds a strong market position as evidenced by Booking.com
          being the world&apos;s leading brand for booking online accommodation
          reservations based on room nights booked, with operations worldwide
          and a significant number of properties listed in their service. The
          company has a diversified service offering, globally recognized
          brands, and a commitment to continuous investment and expansion,
          including technological innovation and strategic acquisitions.
        </p>
        <p className="font-semibold text-gray-800 mt-4">Liquidity rating:</p>
        {/* Add liquidity content here */}
      </div>
    </div>
  );
};

export default InfoBreakdown;
