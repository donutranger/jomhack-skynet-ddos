"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "~/app/Overlay.module.css";

const Loader = () => {
  const modalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    modalRef.current = document.getElementById("modal-root");
    setMounted(true);
  }, []);

  if (!modalRef.current && !mounted) return null;

  return createPortal(
    <div
      className={`${styles.overlay} flex flex-col items-center justify-center gap-4`}
    >
      <Image
        src="/spinner.svg"
        alt="Step"
        width={64}
        height={64}
        className="animate-spin"
      />
      <p className="text-white">This could take up to few minutes</p>
    </div>,
    // @ts-expect-error
    modalRef.current
  );
};

export default Loader;
