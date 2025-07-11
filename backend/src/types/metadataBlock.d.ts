export interface MetadataBlockResponse {
  status: string;
  data: {
    id: string;
    displayName: string;
    displayOnCreate: boolean;
    name: string;
  }[];
}

export interface MetadataItemResponse {
  status: string;
  data: MetadataItem;
}

export interface MetadataItem {
  id: number;
  name: string;
  displayName: string;
  displayOnCreate: boolean;
  fields: Record<string, MetadataField>;
}

export type MetadataField = {
  name: string;
  displayName: string;
  displayOnCreate: boolean;
  title: string;
  type: string; // ví dụ: "TEXT", "NONE"
  typeClass: string; // ví dụ: "compound", "primitive", "controlledVocabulary"
  watermark: string;
  description: string;
  multiple: boolean;
  isControlledVocabulary: boolean;
  displayFormat: string;
  displayOrder: number;
  isRequired: boolean;
  controlledVocabularyValues?: string[];
  childFields?: Record<string, MetadataField>; // Đệ quy cho field dạng compound
};
