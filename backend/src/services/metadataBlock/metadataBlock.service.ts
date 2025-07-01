import axios from "axios";
import { MetadataBlockResponse } from "../../types/metadataBlock";

const BASE = process.env.DATAVERSE_API_BASE || "https://demo.dataverse.org/api";

export const fetchAllData = async (): Promise<MetadataBlockResponse> => {
  try {
    const response = await axios.get(`${BASE}/metadatablocks`);

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
