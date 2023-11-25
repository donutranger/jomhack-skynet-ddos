"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useFile } from "~/app/provider";
import Button from "~/components/button";
import Dropzone from "~/components/dropzone";
import Loader from "~/components/loader";

const CapitalBreakdown = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { setFileIds } = useFile();
  const { mutateAsync, status } = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);

      return fetch(`${window.api_endpoint}/upload/capital`, {
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
    if (files) {
      files.map((file) =>
        mutateAsync(file).then((res) => {
          setFileIds((prev) => ({
            ...prev,
            capitalBreakdownId: res?.id,
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
            <h2 className="font-bold">Capital Breakdown</h2>
            <h3 className="text-sm">
              Upload your capital breakdown details here
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Maximum file size: 5 MB per file Supported file types: PNG, JPG,
            JPEG, PDF, DOC, DOCX, XLS, XLSX To reupload a file, please delete
            the existing file first.
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
      {status === "success" && (
        <Image
          src="/Capital_Breakdown.svg"
          alt="Capital breakdown"
          width={1000}
          height={600}
        />
      )}
    </div>
  );
};

export default CapitalBreakdown;
