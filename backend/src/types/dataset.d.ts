export interface DatasetInterface {
  status: string;
  data: DatasetData;
}
export interface DatasetData {
  id: number;
  identifier: string;
  persistentUrl: string;
  protocol: string;
  authority: string;
  separator: string;
  publisher: string;
  publicationDate: string;
  storageIdentifier: string;
  datasetType: string;
  latestVersion: DatasetVersion;
}

export interface DatasetVersion {
  id: number;
  datasetId: number;
  datasetPersistentId: string;
  storageIdentifier: string;
  versionNumber: number;
  versionMinorNumber: number;
  versionState: string;
  latestVersionPublishingState: string;
  deaccessionLink: string;
  productionDate: string;
  lastUpdateTime: string;
  releaseTime: string;
  createTime: string;
  publicationDate: string;
  citationDate: string;
  license: License;
  fileAccessRequest: boolean;
  metadataBlocks: MetadataBlocks;
  files: DatasetFile[];
}
export interface License {
  name: string;
  uri: string;
  iconUri: string;
  rightsIdentifier: string;
  rightsIdentifierScheme: string;
  schemeUri: string;
  languageCode: string;
}

export interface DatasetFile {
  label: string;
  restricted: boolean;
  version: number;
  datasetVersionId: number;
  dataFile: DataFile;
}

export interface DataFile {
  id: number;
  persistentId: string;
  filename: string;
  contentType: string;
  friendlyType: string;
  filesize: number;
  storageIdentifier: string;
  rootDataFileId: number;
  md5: string;
  checksum: Checksum;
  tabularData: boolean;
  creationDate: string;
  publicationDate: string;
  fileAccessRequest: boolean;
  isPartOf?: any; // optional: for breadcrumb
}

export interface Checksum {
  type: string;
  value: string;
}
export interface MetadataBlocks {
  citation: CitationBlock;
}

export interface CitationBlock {
  displayName: string;
  name: string;
  fields: MetadataField[];
}

export type MetadataField =
  | PrimitiveField
  | ControlledVocabularyField
  | CompoundField<any>;
export interface PrimitiveField {
  typeName: string;
  multiple: boolean;
  typeClass: "primitive";
  value: string;
}

export interface ControlledVocabularyField {
  typeName: string;
  multiple: boolean;
  typeClass: "controlledVocabulary";
  value: string[];
}

export interface CompoundField<T> {
  typeName: string;
  multiple: boolean;
  typeClass: "compound";
  value: T[];
}
export interface Author {
  authorName: PrimitiveField;
  authorAffiliation?: PrimitiveField;
}

export interface DsDescription {
  dsDescriptionValue: PrimitiveField;
}

export interface DatasetContact {
  datasetContactName: PrimitiveField;
  datasetContactAffiliation?: PrimitiveField;
  datasetContactEmail?: PrimitiveField;
}
