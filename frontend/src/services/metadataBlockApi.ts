import type {
  MetadataBlockResponse,
  MetadataItemResponse,
} from "@/types/metadataBlockI";
import axios from "axios";

const apiUrl =
  import.meta.env.VITE_API_BASE_URL //|| "http://localhost:3000/api/v1";

const metadataBlockApi = {
  getAllMetadataBlock: async (): Promise<MetadataBlockResponse | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/metadataBlock/getAllMetadataBlock`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },

  getMetadataItem: async (
    name: string
  ): Promise<MetadataItemResponse | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/metadataBlock/getMetadataItem?name=${name}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },
};

export default metadataBlockApi;
