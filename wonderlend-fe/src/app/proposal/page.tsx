"use client";
import React, { useState } from "react";
import Stepper from "~/components/stepper";
import BusinessPlan from "./components/BusinessPlan";
import Footer from "./components/Footer";
import FinancialStatement from "./components/FinancialStatement";
import ARR from "./components/ARR";
import CapitalBreakdown from "./components/CapitalBreakdown";
import Breadcrumb from "./components/Breadcrumb";

const Proposal = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
