export interface DataverseItem {
  name: string;
  identifier: string;
  global_id: string;
  description: string;
}

export interface DataverseSearchResponse {
  status: string;
  dataveresResponse: {
    total_count: number;
    start: number;
    items: DataverseItem[];
  };
  // dataveresMetadata: any;
}
