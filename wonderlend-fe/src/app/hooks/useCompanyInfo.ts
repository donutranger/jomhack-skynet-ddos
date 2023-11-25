import { useCallback } from "react";

const useCompanyInfo = () => {
  const setCompanyData = useCallback((key: string, data: any) => {
    const companyInfoString =
      typeof window !== undefined
        ? window.localStorage.getItem("organization-info")
        : null;
    const companyData = companyInfoString
      ? JSON.parse(companyInfoString)
      : null;
    window.localStorage.setItem(
      "organization-info",
      JSON.stringify({ ...companyData, [key]: data })
    );
  }, []);

  const getCompanyData = useCallback(() => {
    const companyInfoString =
      typeof window !== undefined
        ? window.localStorage.getItem("organization-info")
        : null;
    const companyData = companyInfoString
      ? JSON.parse(companyInfoString)
      : null;
    return companyData;
  }, []);

  return { getCompanyData, setCompanyData };
};

export default useCompanyInfo;
