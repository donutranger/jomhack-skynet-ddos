import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TFormData } from "../types";

type TProps = {
  register: UseFormRegister<TFormData>;
};

const FinalForm = ({ register }: TProps) => {
  return (
    <div className="pt-3">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">
          Hang tight, Just a few more questions!
        </h3>
        <p>Help us to evaluate you better.</p>
      </div>
      <form className="pt-6">
        <div className="p-4 grid grid-cols-2">
          <div className="grid grid-rows-4 gap-4 font-bold">
            <p>Organization name:*</p>
            <p>How much funds do you need?*</p>
            <p>Runway Period?*</p>
            <p>Use of Funds?* </p>
          </div>
          <div className="grid gap-4">
            <input
              type="text"
              {...register("company_name", { required: true })}
              className="p-2 rounded-md border border-gray-300 w-80"
            />
            <div className="p-2 rounded-md border border-gray-300 w-80 flex gap-2">
              <span>MYR</span>
              <input
                type="number"
                {...register("funds_needed", { required: true })}
                className="outline-none"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                {...register("runway_period", { required: true })}
                className="p-2 rounded-md border border-gray-300 w-28"
              />
              <select
                {...register("runway_period_suffix", { required: true })}
                className="p-1 rounded-md border border-gray-300 w-48"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <input
              type="text"
              {...register("use_of_funds", { required: true })}
              className="p-2 rounded-md border border-gray-300 w-80"
            />
          </div>
        </div>
        <span className="border-t border-gray-300 block w-5/6"></span>
        <div>
          <p className="p-4 font-bold">
            Help us improve our findings to get an accurate score :
          </p>
          <div className="p-4 grid grid-cols-2">
            <div className="grid grid-rows-3 gap-4 font-bold">
              <p>What is your marketing strategy? </p>
              <p>Provide detailed Customer acquisition cost? </p>
              <p>
                You want to collect customer data, How are you planning to
                comply with PDPA?{" "}
              </p>
            </div>
            <div className="grid gap-4">
              <input
                type="text"
                {...register("market_strategy")}
                className="p-2 rounded-md border border-gray-300 w-80"
              />
              <input
                type="text"
                {...register("cust_acq_cost")}
                className="p-2 rounded-md border border-gray-300 w-80"
              />
              <textarea
                {...register("pdpa_details")}
                className="p-2 rounded-md border border-gray-300 w-80 resize-none"
              />
            </div>
          </div>
        </div>
        <span className="border-t border-gray-300 block w-5/6"></span>
      </form>
    </div>
  );
};

export default FinalForm;
