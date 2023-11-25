"use client";
import React from "react";
import Breadcrumb from "~/app/proposal/components/Breadcrumb";
import Sidebar from "~/components/sidebar";
import IndustryScore from "../components/IndustryScore";
import CompanyName from "../components/CompanyName";
import LoanDetails from "../components/LoanDetails";
import FinancialRisk from "../components/FinancialRisk";
import ESGScore from "../components/ESGScore";
import RepaymentConfidence from "../components/RepaymentConfidence";
import CapitalBreakdown from "../components/CapitalBreakdown";
import InfoBreakdown from "../components/InfoBreakdown";

const Details = () => {
  return (
    <div className="w-full min-h-[94vh] h-max flex p-4 pl-16 flex-col gap-4 relative bg-white">
      <Sidebar />
      <Breadcrumb />
      <CompanyName />
      <LoanDetails />
      <IndustryScore />
      <FinancialRisk />
      <ESGScore />
      <RepaymentConfidence />
      <CapitalBreakdown />
      <InfoBreakdown />
      <div className="flex justify-between gap-4 flex-wrap"></div>
    </div>
  );
};

export default Details;
