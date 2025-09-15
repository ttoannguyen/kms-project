import api from "@/lib/axios";
import type { CountData } from "@/types/Dataverse/dataverse";
// import axios from "axios";

const baseURL = import.meta.env.VITE_DATAVERSE_URL; //|| "http://localhost:3000/api/v1";

export const getDataverses = async ({
  q,
  sort,
  order,
  page,
  perPage,
  types,
  subtree, // No default value
}: {
  q?: string;
  sort: string;
  order: string;
  page: number;
  perPage: number;
  types?: string[];
  subtree?: string;
}) => {
  const payload = {
    q: q || "*",
    sort,
    order,
    page,
    per_page: perPage,
    ...(types && { types }),
    ...(subtree && { subtree }), // Include subtree only if defined
  };

  console.log(`${baseURL}/dataverse/getdata`, payload);

  const res = await api.post(`${baseURL}/dataverse/getdata`, payload);

  // console.log(res.data);

  return {
    items: res.data?.dataveresResponse?.items || [],
    total: res.data?.dataveresResponse?.total_count || 0,
  };
};

export const getCountData = async (): Promise<CountData> => {
  const res = await api.get(`${baseURL}/dataverse/count`);
  return res.data;
};
