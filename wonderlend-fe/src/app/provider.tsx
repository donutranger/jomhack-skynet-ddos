"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TFileIds = {
  businessOverviewId: string;
  financialStatementsId: string;
  complianceId: string;
};

type TFileContext = {
  fileIds: TFileIds;
  setFileIds: Dispatch<SetStateAction<TFileIds>>;
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
  const [fileIds, setFileIds] = useState({
    businessOverviewId: "",
    financialStatementsId: "",
    complianceId: "",
  });
  return (
    <QueryClientProvider client={queryClient}>
      <FileContext.Provider value={{ fileIds, setFileIds }}>
        {children}
      </FileContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
