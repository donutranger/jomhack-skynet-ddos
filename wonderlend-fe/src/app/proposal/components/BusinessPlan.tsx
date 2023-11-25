"use client";
import React, { useContext, useState } from "react";
import Dropzone from "~/components/dropzone";
import Button from "~/components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "~/components/loader";
import { useFile } from "~/app/provider";

const BusinessPlan = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { setFileIds } = useFile();
  const { mutateAsync, status } = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);

      return fetch(
        "https://he23odlt50.execute-api.ap-southeast-1.amazonaws.com/Prod/upload/business",
        {
          method: "POST",
          body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  });

  // const { data } = useQuery({
  //   queryKey: ["risk-data"],
  //   queryFn: () => {
  //     fetch(
  //       "https://he23odlt50.execute-api.ap-southeast-1.amazonaws.com/Prod/risk/report",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           business_overview_id:
  //             "47c3837481bf504d62d0cd3c7e9a8bd1bccf63b4cf134cdc0ba05a5b12a6869e",
  //           financial_statements_id:
  //             "6627c64e3468193b38a7bb6e7f9a14e01ca18769c88325d86337f2392f0197d7",
  //           compliance_id:
  //             "58b1d84a744937458effd1115a1dd1f3b6d9b8f3f7c4c5cf3b67c64e4324a925",
  //         }),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => console.error("Error:", error));
  //   },
  // });

  // console.log(data);

  const handleSubmit = () => {
    if (files) {
      files.map((file) =>
        mutateAsync(file).then((res) => {
          setFileIds((prev) => ({
            ...prev,
            // @ts-expect-error
            businessOverviewId: res.result?.id,
            fileIsSubmitted: true,
          }));
        })
      );
    }
  };

  return (
    <div className="flex justify-between p-4 mt-8 border border-gray-200 rounded-md">
      {status === "pending" && <Loader />}
      <div className="flex flex-col justify-between items-stretch max-w-sm">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Business Plan</h2>
          <h3 className="text-sm">Upload your business plan details here</h3>
        </div>
        <p className="text-xs text-gray-400">
          Maximum file size: 5 MB per file Supported file types: PNG, JPG, JPEG,
          PDF, DOC, DOCX, XLS, XLSX To reupload a file, please delete the
          existing file first.
        </p>
      </div>
      <div className="max-w-sm flex flex-col justify-between">
        <Dropzone onFileChange={(files: File[]) => setFiles(files)} />
        <Button
          text="Submit"
          disabled={!files?.length}
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default BusinessPlan;
