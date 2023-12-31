"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TFileIds = {
  businessOverviewId: string;
  financialStatementsId: string;
  complianceId: string;
  capitalBreakdownId: string;
  creditScore: number;
};

type TFiles = {
  businessOverview: File[] | null;
  financialStatements: File[] | null;
  compliance: File[] | null;
  capitalBreakdown: File[] | null;
};

type TFileContext = {
  fileIds: TFileIds;
  files: TFiles;
  setFileIds: Dispatch<SetStateAction<TFileIds>>;
  setFiles: Dispatch<SetStateAction<TFiles>>;
};

const FileContext = createContext<TFileContext | null>(null);

export const useFile = () => {
  const flowProviderContext = useContext(FileContext);

  if (!flowProviderContext)
    throw new Error("useFlow must be used within a FlowProvider component.");

  return flowProviderContext;
};

const Providers: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [fileIds, setFileIds] = useState<TFileIds>({
    businessOverviewId: "",
    financialStatementsId: "",
    complianceId: "",
    capitalBreakdownId: "",
    creditScore: 0,
  });
  const [files, setFiles] = useState<TFiles>({
    businessOverview: null,
    financialStatements: null,
    compliance: null,
    capitalBreakdown: null,
  });

  useEffect(() => {
    localStorage.setItem("organization-files", JSON.stringify(fileIds));
  }, [fileIds]);

  useEffect(() => {
    window.api_endpoint =
      "https://he23odlt50.execute-api.ap-southeast-1.amazonaws.com/Prod";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <FileContext.Provider value={{ files, fileIds, setFileIds, setFiles }}>
        {children}
      </FileContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
