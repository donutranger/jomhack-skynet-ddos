"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useFile } from "~/app/provider";
import Button from "~/components/button";
import Dropzone from "~/components/dropzone";
import Loader from "~/components/loader";

const BusinessPlan = () => {
  const { fileIds, setFileIds, files, setFiles } = useFile();
  const { mutateAsync, status } = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);

      return fetch(`${window.api_endpoint}/upload/business`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then((res) => res.result);
    },
  });

  const handleSubmit = () => {
    if (files && files.businessOverview) {
      files.businessOverview.map((file) =>
        mutateAsync(file).then((res) => {
          setFileIds((prev) => ({
            ...prev,
            businessOverviewId: res?.id,
            fileIsSubmitted: true,
          }));
        })
      );
    }
  };

  return (
    <div className="pb-32 flex flex-col gap-4">
      <div className="flex justify-between p-4 mt-8 border border-gray-200 rounded-md">
        {status === "pending" && <Loader />}
        <div className="flex flex-col justify-between items-stretch max-w-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Business Plan</h2>
            <h3 className="text-sm">Upload your business plan details here</h3>
          </div>
          <p className="text-xs text-gray-400">
            Maximum file size: 5 MB per file Supported file types: PNG, JPG,
            JPEG, PDF, DOC, DOCX, XLS, XLSX To reupload a file, please delete
            the existing file first.
          </p>
        </div>
        <div className="max-w-sm flex flex-col justify-between">
          <Dropzone
            onFileChange={(files: File[]) =>
              setFiles((prev) => ({ ...prev, businessOverview: files }))
            }
          />
          <Button
            text="Submit"
            disabled={!files?.businessOverview?.length}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
      {fileIds?.businessOverviewId && files?.businessOverview?.length && (
        <Image src="/BP.svg" alt="Business plan" width={1000} height={600} />
      )}
    </div>
  );
};

export default BusinessPlan;
