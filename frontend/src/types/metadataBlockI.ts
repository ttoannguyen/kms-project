export interface MetadataBlockResponse {
  status: string;
  data: {
    id: string;
    displayName: string;
    displayOnCreate: boolean;
    name: string;
  }[];
}

export interface MetadataBlockInterface {
  status: string;
  data: {
    id: string;
    displayName: string;
    displayOnCreate: boolean;
    name: string;
    checked: boolean;
  }[];
}
