"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useFile } from "~/app/provider";
import Button from "~/components/button";
import Dropzone from "~/components/dropzone";
import Loader from "~/components/loader";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import ARRData from "./ARRData";

const ARR = () => {
  const { fileIds, files, setFiles, setFileIds } = useFile();
  const { setCompanyData } = useCompanyInfo();
  const { mutateAsync, status } = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);

      return fetch(`${window.api_endpoint}/upload/compliance`, {
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
    if (files && files.compliance) {
      files.compliance.map((file) =>
        mutateAsync(file).then((res) => {
          setFileIds((prev) => ({
            ...prev,
            complianceId: res?.id,
            fileIsSubmitted: true,
          }));
          setCompanyData("revenue", res?.revenue);
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
            <h2 className="font-bold">Annual Recurring Revenue</h2>
            <h3 className="text-sm">
              Upload your annual recurring revenue details here
            </h3>
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
              setFiles((prev) => ({ ...prev, compliance: files }))
            }
          />
          <Button
            text="Submit"
            disabled={!files?.compliance?.length}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
      {fileIds?.complianceId && files?.compliance?.length && <ARRData />}
    </div>
  );
};

export default ARR;
