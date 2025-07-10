
import redis from "../../config/redis";
import { DataverseSearchResponse } from "../../types/dataverse";
import config from "../../config/config";
import axios from "axios";
import { getRuntimeConfig } from "../../config/runtimeConfig";



export const fetchData = async (
  page: number,
  perPage: number,
  q = "*",
  sort?: string,
  order?: string,
  types: string[] = [], // Changed from type to types for array support
  subtree?: string // Added subtree parameter
): Promise<DataverseSearchResponse> => {

  const runtimeConfig = getRuntimeConfig(); // ✅ Lấy config từ runtime
  const BASE = runtimeConfig.dataverse_api_base;
  console.log(BASE)
  const start = (page - 1) * perPage;
  const searchParams = new URLSearchParams();
  searchParams.append("q", q);
  searchParams.append("start", start.toString());
  searchParams.append("per_page", perPage.toString());
  if (subtree) searchParams.append("subtree", subtree);
  if (sort) searchParams.append("sort", sort);
  if (order) searchParams.append("order", order);
  if (types.length > 0) {
    types.forEach((type) => searchParams.append("type", type)); // Support multiple types
  }

  const cacheKey = `dataverse:search:${searchParams.toString()}`;
  console.log("key - fetchData", cacheKey);
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  console.log("service", `${BASE}/search?${searchParams.toString()}`);
  try {
    const response = await axios.get(
      `${BASE}/search?${searchParams.toString()}`
    );

    const dataResponse = {
      status: "1000",
      dataveresResponse: response.data.data,
      // dataveresMetadata: dataveresMetadata,
    };
    if (response.status === 200 && response.data?.data?.items?.length > 0) {
      console.log("store fetchData key", cacheKey);
      await redis.set(cacheKey, JSON.stringify(dataResponse), "EX", 300);
    }

    return dataResponse;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Dataverse API error",
        requestUrl: error.response.data?.requestUrl,
      };
    }

    throw {
      status: 500,
      message: "Internal server error while calling Dataverse",
    };
  }
};

export const fetchCounts = async () => {
  const runtimeConfig = getRuntimeConfig();
  const BASE = runtimeConfig.dataverse_api_base;
  console.log(`in fetch ${BASE}`);
  const cacheKey = `counts:summary`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  const [dataverses, datasets, files] = await Promise.all([
    axios.get(`${BASE}/search?q=*&type=dataverse`),
    axios.get(`${BASE}/search?q=*&type=dataset`),
    axios.get(`${BASE}/search?q=*&type=file`),
    // axios.get(`${BASE}/dataverses/root?returnChildCount=true`),
  ]);
  
  const result = {
    totalDataverses: dataverses.data.data.total_count,
    totalDatasets: datasets.data.data.total_count,
    totalFiles: files.data.data.total_count,
    // rootDataverse: root.data.data.childCount,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 180);
  return result;
};
