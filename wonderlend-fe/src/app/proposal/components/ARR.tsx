"use client";
import React, { useState } from "react";
import Dropzone from "~/components/dropzone";
import Button from "~/components/button";
import { useMutation } from "@tanstack/react-query";
import Loader from "~/components/loader";
import { useFile } from "~/app/provider";

const ARR = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { setFileIds } = useFile();
  const { mutateAsync, status } = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);

      return fetch(
        " https://he23odlt50.execute-api.ap-southeast-1.amazonaws.com/Prod/upload/compliance",
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

  const handleSubmit = () => {
    if (files) {
      files.map((file) =>
        mutateAsync(file).then((res) => {
          setFileIds((prev) => ({
            ...prev,
            // @ts-expect-error
            complianceId: res.result?.id,
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
          <h2 className="font-bold">Annual Recurring Revenue</h2>
          <h3 className="text-sm">
            Upload your annual recurring revenue details here
          </h3>
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

export default ARR;
