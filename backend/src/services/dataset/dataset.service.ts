import axios from "axios";
import { DatasetInterface } from "../../types/dataset";
const BASE = process.env.DATAVERSE_API_BASE || "https://demo.dataverse.org/api";

export const fetchDataset = async (
  persistentId: string
): Promise<DatasetInterface> => {
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
