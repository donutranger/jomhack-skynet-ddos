"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type TProps = {
  onFileChange: (file: File[]) => void;
};

const Dropzone = (props: TProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      props.onFileChange(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="b-1 w-96 border-dashed border border-gray-600 p-10 rounded-sm flex flex-col items-center gap-8 bg-gray-100">
          <Image
            src="/upload.svg"
            alt="Upload Logo"
            width={24}
            height={24}
            priority
          />
          <p className="text-sm">
            Drag-and-drop file, or{" "}
            <button onClick={open} className="text-blue-600">
              browse computer
            </button>
          </p>
        </div>
      </div>
      <div>
        {files.map((file) => (
          <div
            key={file.name}
            className="border border-gray-400 p-2 flex rounded-lg gap-3"
          >
            <Image
              src="/document.svg"
              alt="Document icon"
              width={24}
              height={24}
              priority
            />
            <p className="text-base">{`${file.name.slice(0, 20)}${
              file.name.length > 20 ? "..." : ""
            }`}</p>
            <p className="flex-1">{Math.round(file.size * 0.001)} KB</p>
            <button
              className="unset cursor-pointer"
              onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
            >
              <Image
                src="/close.svg"
                alt="Close icon"
                width={24}
                height={24}
                priority
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropzone;
