import axios from "axios";
import { DatasetInterface } from "../../types/dataset";
import config from "../../config/config";
import { getRuntimeConfig } from "../../config/runtimeConfig";

// const BASE = config.dataverse.api;

export const fetchDataset = async (
  persistentId: string
): Promise<DatasetInterface> => {
  const runtimeConfig = getRuntimeConfig();
  const BASE = runtimeConfig.dataverse_api_base;
  const searchParams = new URLSearchParams();

  searchParams.append("persistentId", persistentId.toString());

  try {
    const responseTemp = await axios.get(
      `${BASE}/datasets/:persistentId/?persistentId=${persistentId}`
    );

    let id: number | null = null;
    if (responseTemp) {
      id = responseTemp.data.data.id;
    }

    const response = await axios.get(
      `${BASE}/datasets/${id}?returnOwners=true`
    );

    return response.data;
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

export const fetchDownloadCount = async (
  id: string
): Promise<{
  id: number;
  downloadCount: number;
}> => {
  const runtimeConfig = getRuntimeConfig();
  const BASE = runtimeConfig.dataverse_api_base;
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());

  try {
    const response = await axios.get(`${BASE}/datasets/${id}/download/count`);

    return response.data;
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

export const fetchDownloadSize = async (
  id: string,
  version: string
): Promise<{
  status: string;
  data: {
    message: string;
    storageSize: number;
  };
}> => {
  const runtimeConfig = getRuntimeConfig();
  const BASE = runtimeConfig.dataverse_api_base;
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());
  searchParams.append("version", version.toString());

  try {
    const response = await axios.get(
      `${BASE}/datasets/${id}/versions/${version}/downloadsize`
    );

    return response.data;
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

export const fetchDatasetForUploadFile = async (
  apiKey: string
): Promise<any> => {
  const runtimeConfig = getRuntimeConfig();
  const BASE = runtimeConfig.dataverse_api_base;
  // const BASE = "https://demo.dataverse.org/api";
  const searchParams = new URLSearchParams();
  searchParams.append("apiKey", apiKey.toString());

  try {
    const response = await axios.get(
      `${BASE}/mydata/retrieve?dvobject_types=Dataset&published_states=Published&published_states=Draft&role_ids=7`,
      {
        headers: {
          "X-Dataverse-key": apiKey,
        },
      }
    );
    return response.data;
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
