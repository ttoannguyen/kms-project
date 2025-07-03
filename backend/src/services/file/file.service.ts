import axios from "axios";
import { DataFileResponse } from "../../types/file";

const BASE = process.env.DATAVERSE_API_BASE || "https://demo.dataverse.org/api";

export const fetchData = async (id: string): Promise<DataFileResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());

  try {
    const response = await axios.get(`${BASE}/files/${id}?returnOwners=true`);

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

export const fetchPreview = async (
  fileId: number,
  metadataId: number,
  contentType: string
): Promise<string> => {
  const searchParams = new URLSearchParams();

  searchParams.append("fileId", fileId.toString());
  searchParams.append("metadataId", metadataId.toString());
  searchParams.append("contentType", contentType.toString());

  try {
    // B1: Xác định loại preview
    let previewerType = "TextPreview";
    if (contentType.startsWith("image/")) {
      previewerType = "ImagePreview";
    } else if (contentType === "application/pdf") {
      previewerType = "PDFPreview";
    } else if (contentType === "text/tab-separated-values") {
      previewerType = "SpreadsheetPreview";
    }

    // B2: Tạo callback URL gốc
    const rawCallbackUrl = `${BASE}/v1/files/${fileId}/metadata/${metadataId}/toolparams/4`;

    // B3: Encode callback: encodeURIComponent -> base64
    const encodedCallback = Buffer.from(
      encodeURIComponent(rawCallbackUrl)
    ).toString("base64");

    // B4: Ghép thành URL preview hoàn chỉnh
    return `https://demo.dataverse.org/previewers/v1.4/${previewerType}.html?callback=${encodedCallback}`;
  } catch (error) {
    console.error("Failed to generate preview URL:", error);
    throw new Error("Could not generate preview URL");
  }
};

export const fetchMetadata = async (
  id: string
): Promise<{
  label: string;
  restricted: boolean;
  id: number;
}> => {
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());

  try {
    const response = await axios.get(`${BASE}/files/${id}/metadata`);

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
  status: string;
  data: {
    message: string;
  };
}> => {
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());

  try {
    const response = await axios.get(`${BASE}/files/${id}/downloadCount`);

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
