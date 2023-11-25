import Image from "next/image";
import React, { useCallback } from "react";

type TProps = {
  currentStep: number;
  steps: string[];
};

const Stepper = (props: TProps) => {
  const lastStep = props.steps.length - 1;

  const isActiveOrDone = (step: number) => step <= props.currentStep;

  const getIcon = useCallback(
    (step: number) => {
      if (step < props.currentStep) return "/step-done.svg";
      if (step === props.currentStep) return "/step-active.svg";
      return "/step-inactive.svg";
    },
    [props.currentStep]
  );

  const getLinkIcon = useCallback(
    (step: number) => {
      if (step < props.currentStep) return "/step-link-active.svg";
      return "/step-link-inactive.svg";
    },
    [props.currentStep]
  );

  return (
    <div className="flex flex-col gap-2 items-center p-5">
      <div className="flex justify-between w-[33rem]">
        {props.steps.map((step, index) => (
          <p
            key={`${step}-title`}
            className={`${
              isActiveOrDone(index) ? "text-blue-600" : "text-gray-500"
            } text-sm`}
          >
            {step}
          </p>
        ))}
      </div>
      <div className="flex items-center">
        {props.steps.map((step, index) => {
          if (index === props.steps.length - 1) return null;
          return (
            <div key={`${step}-${index}`} className="flex">
              <Image src={getIcon(index)} alt="Step" width={32} height={32} />
              <Image
                src={getLinkIcon(index)}
                alt="Step link"
                width={120}
                height={10}
              />
            </div>
          );
        })}
        <Image src={getIcon(lastStep)} alt="Step" width={32} height={32} />
      </div>
    </div>
  );
};

export default Stepper;
