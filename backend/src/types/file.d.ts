export interface Checksum {
  type: string; // e.g., "MD5"
  value: string;
}

export interface DataverseParent {
  type: "DATAVERSE";
  identifier: string; // e.g., "demo"
  isReleased: boolean;
  displayName: string;
  isPartOf?: DataverseParent; // optional, for recursive nesting
}

export interface DatasetParent {
  type: "DATASET";
  persistentIdentifier: string;
  identifier: number;
  version: string;
  displayName: string;
  isPartOf: DataverseParent;
}

export interface DataFile {
  id: number;
  persistentId: string;
  pidURL: string;
  filename: string;
  contentType: string;
  friendlyType: string;
  filesize: number;
  description: string;
  storageIdentifier: string;
  rootDataFileId: number;
  md5: string;
  checksum: Checksum;
  tabularData: boolean;
  creationDate: string;
  publicationDate: string;
  fileAccessRequest: boolean;
  isPartOf: DatasetParent;
}

export interface FileMetadata {
  description: string;
  label: string;
  restricted: boolean;
  version: number;
  datasetVersionId: number;
  dataFile: DataFile;
}

export interface DataFileResponse {
  status: string;
  data: FileMetadata;
}
