import moment from "moment";

export type TCompany = {
  key: string;
  name: string;
  score: number;
  status: "pending" | "approved" | "rejected";
  businessType: string;
  dateApplied: string;
  actions: null;
};

export const defaultData: TCompany[] = [
  {
    key: "rumah-sdn-bhd",
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    key: "newell-road-sdn-bhd",
    name: "Newell Road Sdn Bhd",
    score: 69,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    key: "air-shad-sdn-bhd",
    name: "Air Shad Sdn Bhd",
    score: 69,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    key: "farfar-sdn-bhd",
    name: "Farfar Sdn Bhd",
    score: 92,
    status: "approved",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    key: "skynet-sdn-bhd",
    name: "Skynet Sdn Bhd",
    score: 87,
    status: "rejected",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
];
