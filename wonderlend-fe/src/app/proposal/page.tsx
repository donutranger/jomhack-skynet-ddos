"use client";
import React, { useState } from "react";
import Stepper from "~/components/stepper";
import BusinessPlan from "./components/BusinessPlan";
import Footer from "./components/Footer";
import FinancialStatement from "./components/FinancialStatement";
import ARR from "./components/ARR";
import CapitalBreakdown from "./components/CapitalBreakdown";
import Breadcrumb from "./components/Breadcrumb";
import FinalForm from "./components/FinalForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { TFormData } from "./types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useCompanyInfo from "../hooks/useCompanyInfo";

const Proposal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { register, handleSubmit } = useForm<TFormData>();
  const { getCompanyData } = useCompanyInfo();
  const { mutateAsync } = useMutation({
    // @ts-expect-error
    mutationFn: (data: TFormData) => {
      const body = {
        company_name: data.company_name,
        funds_needed: data.funds_needed,
        runway_period: `${data.runway_period} ${data.runway_period_suffix}`,
        use_of_funds: data.use_of_funds,
        market_strategy: data.market_strategy,
        cust_acq_cost: data.cust_acq_cost,
        pdpa_details: data.pdpa_details,
      };

      // TODO: uncomment when submit-form fixed
      // return fetch(
      //   `${window.api_endpoint}/Prod/submit-form`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(body),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const companyData = getCompanyData();
      return localStorage.setItem(
        "organization-info",
        JSON.stringify({ ...companyData, ...body })
      );
    },
  });

  const onSubmit: SubmitHandler<TFormData> = (data) =>
    mutateAsync(data).then(() => router.push("/success"));

  if (currentStep === 4)
    return (
      <div className="h-full w-full min-h-screen flex flex-col items-center bg-white">
        <div className="w-4/6 p-4">
          <Breadcrumb />
          <FinalForm register={register} />
        </div>
        <Footer
          currentStep={currentStep}
          onBackClick={() => setCurrentStep(currentStep - 1)}
          onNextClick={handleSubmit(onSubmit)}
        />
      </div>
    );

  return (
    <div className="h-full w-full min-h-screen flex flex-col items-center bg-white">
      <div className="w-4/6 p-4">
        <Breadcrumb />
        <Stepper
          steps={[
            "Business Plan",
            "Financial Statement",
            "ARR",
            "Capital Breakdown",
          ]}
          currentStep={currentStep}
        />
        {currentStep === 0 && <BusinessPlan />}
        {currentStep === 1 && <FinancialStatement />}
        {currentStep === 2 && <ARR />}
        {currentStep === 3 && <CapitalBreakdown />}
      </div>
      <Footer
        currentStep={currentStep}
        onBackClick={() => setCurrentStep(currentStep - 1)}
        onNextClick={() => {
          setCurrentStep(currentStep + 1);
        }}
      />
    </div>
  );
};

export default Proposal;
