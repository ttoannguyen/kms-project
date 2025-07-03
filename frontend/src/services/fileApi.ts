import type { DataFileResponse, GetMetadata } from "@/types/file";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const dataverseUrl = import.meta.env.VITE_DATAVERSE_URL || "https://demo.dataverse.org/api";

const fileApi = {
  getFile: async (
    id: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<DataFileResponse | null> => {
    try {
      const response = await axios.get(`${apiUrl}/file/getFile?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Init failed", error);
      setError("Error");
      return null;
    }
  },

  getMetadataFile: async (id: string): Promise<GetMetadata | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/file/getMetadata?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },

  getDownloadCount: async (
    id: string
  ): Promise<{
    status: string;
    data: {
      message: string;
    };
  } | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/file/getDownloadCount?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },

  getPreview: (
    fileId: number,
    metadataId: number,
    contentType: string
  ): string => {
    // 1. Xác định loại previewer dựa trên contentType
    if (!contentType) return "";

    let previewerType = "TextPreview";
    if (contentType.startsWith("image/")) {
      previewerType = "ImagePreview";
    } else if (contentType === "application/pdf") {
      previewerType = "PDFPreview";
    } else if (contentType === "text/tab-separated-values") {
      previewerType = "SpreadsheetPreview";
    }

    const rawCallback = `${dataverseUrl}/files/${fileId}/metadata/${metadataId}/toolparams/4`;
    const encodedCallback = btoa(encodeURIComponent(rawCallback));

    return `https://demo.dataverse.org/previewers/v1.4/${previewerType}.html?callback=${encodedCallback}`;
  },
};

export default fileApi;
