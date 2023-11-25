import React, { useMemo } from "react";
import { useFile } from "~/app/provider";
import Button from "~/components/button";

type TProps = {
  currentStep: number;
  onBackClick: () => void;
  onNextClick: () => void;
};

const Footer = (props: TProps) => {
  const { fileIds } = useFile();

  const isNextDisabled = useMemo(() => {
    if (props.currentStep === 0) return fileIds.businessOverviewId === "";
    if (props.currentStep === 1) return fileIds.financialStatementsId === "";
    if (props.currentStep === 2) return fileIds.complianceId === "";
    if (props.currentStep === 3) return fileIds.capitalBreakdownId === "";
    return false;
  }, [fileIds, props.currentStep]);

  return (
    <div className="fixed bottom-0 flex py-4 gap-96 items-center shadow-black shadow-xl w-full justify-center bg-white">
      <Button
        text="Back"
        variant="neutral"
        className="w-48 h-9"
        onClick={props.onBackClick}
        disabled={props.currentStep === 0}
      />
      <Button
        text={props.currentStep === 4 ? "Submit" : "Next"}
        className="w-48 h-9"
        onClick={props.onNextClick}
        disabled={isNextDisabled}
      />
    </div>
  );
};

export default Footer;
