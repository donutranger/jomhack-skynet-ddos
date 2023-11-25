import React, { useMemo } from "react";
import useCompanyInfo from "../../hooks/useCompanyInfo";

const BusinessPlanData = () => {
  const { getCompanyData } = useCompanyInfo();
  const data = getCompanyData();

  const formData = useMemo(() => {
    return [
      {
        title: "Business name",
        value: data?.company_info?.name,
      },
      {
        title: "Registration No",
        value: data?.company_info?.registration_number,
      },
      {
        title: "Incorporation date",
        value: data?.company_info?.incorporation_date,
      },
      {
        title: "Registered address",
        value: data?.company_info?.registration_address,
      },
      {
        title: "Postcode",
        value: data?.company_info?.registration_postcode,
      },
      {
        title: "Origin",
        value: data?.company_info?.origin_country,
      },
      {
        title: "Business address",
        value: data?.company_info?.business_address,
      },
      {
        title: "Postcode",
        value: data?.company_info?.business_postcode,
      },
      {
        title: "Nature of business",
        value: data?.company_info?.industry,
      },
    ];
  }, [data?.company_info]);

  if (!data?.company_info) return null;

  return (
    <div>
      <form>
        {formData?.map((fd, index) => (
          <div
            key={`${fd.title}-${index}`}
            className="flex px-6 py-4 justify-between items-center border-b border-gray-300"
          >
            <p className="font-bold">{fd.title}</p>
            <input
              type="text"
              defaultValue={fd.value}
              className="p-2 border border-gray-300 rounded-md w-80"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default BusinessPlanData;
