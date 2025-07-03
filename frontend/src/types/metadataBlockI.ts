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

export interface MetadataFieldItem {
  name: string;
  displayName: string;
  displayOnCreate: boolean;
  title: string;
  type: string;
  typeClass: "primitive" | "compound" | "controlledVocabulary" | string;
  watermark: string;
  description: string;
  multiple: boolean;
  isControlledVocabulary: boolean;
  displayFormat: string;
  displayOrder: number;
  isRequired: boolean;
  // Nếu có controlledVocabularyValues (chỉ khi isControlledVocabulary = true)
  controlledVocabularyValues?: string[];
  // Nếu là compound thì có childFields
  childFields?: Record<string, MetadataFieldItem>;
}
