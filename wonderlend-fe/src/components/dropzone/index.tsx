"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type Props = {};

const Dropzone = (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="b-1 border-dashed border border-gray-600 p-10 rounded-sm flex flex-col items-center gap-8 bg-gray-300">
          <Image
            src="/upload.svg"
            alt="Upload Logo"
            width={24}
            height={24}
            priority
          />
          <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
        </div>
      </div>
      <div>
        {files.map((file) => (
          <div
            key={file.name}
            className="border border-gray-700 p-2 flex rounded-lg gap-3"
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
            <p className="flex-1">{file.size * 0.001} KB</p>
            <button
              className="unset cursor-pointer"
              onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
            >
              {" "}
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
