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
        <p className="text-gray-600">
          The company reported $11.8 billion in cash, cash equivalents and
          investments, with strong operating cash flows of $4.9 billion for the
          year ended December 31, 2019. However, they also have future tax
          liabilities and commitments such as the construction of an office
          building that need to be considered
        </p>
        <p className="font-semibold text-gray-800 mt-4">
          Financial risk rating:
        </p>
        <p className="text-gray-600">
          Given the company&apos;s substantial international business, they face
          exposure to currency fluctuations and equity price risks, which were
          mitigated through the use of derivatives and other financial
          instruments. Despite a stable debt level, these factors introduce some
          level of financial risk
        </p>
        <p className="font-semibold text-gray-800 mt-4">
          Capital risk rating reason:
        </p>
        <p className="text-gray-600">
          The capital risk is relatively moderate. Much of the company&apos;s
          stock is held by the founder and there&apos;s a sizable presence of
          preferred stock held by venture capital firms and angel investors.
          These preferred stockholders usually have a higher claim on assets and
          earnings than the common stockholders, which consolidates risk.
          However, too much concentration of ownership with the founder could
          lead to governance issues and challenge decision-making processes.
        </p>
      </div>
    </div>
  );
};

export default InfoBreakdown;
