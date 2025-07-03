import { useState, useEffect } from "react";
import datasetApi from "@/services/DatasetApi";

import type {
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";

import { Link, useSearchParams } from "react-router-dom";
import fileApi from "@/services/fileApi";
import type { DataFileResponse, GetMetadata } from "@/types/file";
import {
  getAuthorsTop,
  getCitation,
  getFiletCitation,
} from "@/helpers/metadataDataset/getMetadata";
import FileMetadataBlock from "@/components/FileMetadataBlock";
import BreadcrumbBlock from "@/components/BreadcrumbBlock ";
import AccessFileBlock from "@/components/AccessFileBlock";
import { ChevronDown } from "lucide-react";
import CitationDownloadBlock from "@/components/CitationDownloadBlock";
// import "../../assets/icon/fontawesome/css/all.min.css";
// import defaultFile from "../../assets/img/muti_file_icon.png";
// import "../../global.css";

const FIle = () => {
  const [searchParams] = useSearchParams();
  const persistentId = searchParams.get("persistentId");
  const fileId = searchParams.get("fileId");

  const [dataset, setDataset] = useState<DatasetInterface | null>(null);
  const [metadata, setMetadata] = useState<MetadataBlocks | null>(null);
  const [file, setFile] = useState<DataFileResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessIsOpen, setAccessIsOpen] = useState(false);

  const [navbar, setNavbar] = useState<string>("Metadata");
  const [downloadCount, setDownloadCount] = useState<string | null>(null);
  const [metadataFile, setMetadataFile] = useState<GetMetadata | null>(null);

  const [citeFileOpen, setCiteFileOpen] = useState<boolean>(false);
  const [citeDatasetOpen, setCiteDatasetOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getDatasetItem = async (): Promise<void> => {
      // if (!persistentId) return;
      if (fileId) {
        const tempFile: DataFileResponse | null = await fileApi.getFile(
          fileId,
          setError
        );
        console.log(tempFile)

        if (tempFile) {
          console.log(tempFile);
          setFile(tempFile);
          const tempDataset: DatasetInterface | null =
            await datasetApi.getDataset(
              tempFile.data.dataFile.isPartOf.persistentIdentifier,
              setError
            );

          if (tempDataset) {
            setDataset(tempDataset);
            setMetadata(tempDataset.data.latestVersion.metadataBlocks);
          }

          console.log(tempDataset);
        }
      }

      setLoading(false);
    };

    const getMetadataFile = async (): Promise<void> => {
      // if (!persistentId) return;
      if (fileId) {
        const tempMetadataFile: GetMetadata | null =
          await fileApi.getMetadataFile(fileId);

        if (tempMetadataFile) {
          setMetadataFile(tempMetadataFile);
        }
      }

      setLoading(false);
    };

    const getDownloadCount = async (): Promise<void> => {
      // if (!persistentId) return;
      if (fileId) {
        const tempCount: {
          status: string;
          data: {
            message: string;
          };
        } | null = await fileApi.getDownloadCount(fileId);

        if (tempCount) {
          setDownloadCount(tempCount.data?.message);
        }
      }

      setLoading(false);
    };
    getDownloadCount();
    getDatasetItem();
    getMetadataFile();
  }, [persistentId, fileId]);

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-red-600">
          Dataset not found
        </h2>
        <p>The dataset with ID "{fileId}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-base pt-[28px] pb-[28px] px-0">
        <Link
          className="block text-hover-underline-blue  mt-[5px] text-[18px] mb-[10px]"
          to={`/dataverse?q=${file?.data.dataFile.isPartOf.isPartOf.identifier}`}
        >
          {file?.data.dataFile.isPartOf.isPartOf.displayName}
        </Link>
        <p style={{ color: "#666666" }}>
          {"(" + getAuthorsTop(metadata?.citation.fields) + ")"}
        </p>
      </div>

      {file?.data.dataFile.isPartOf && (
        <BreadcrumbBlock isPartOf={file?.data.dataFile.isPartOf} />
      )}

      {file && (
        <div>
          <h1 className="text-[36px] leading-[1.1] font-bold mt-4 mb-0">
            {file?.data.label}
          </h1>
          <p>
            This file is part of "{file.data.dataFile.isPartOf.displayName}"{" "}
          </p>
        </div>
      )}

      <span className="label-default">
        {"Version " + dataset?.data.latestVersion.versionNumber}
      </span>

      <div className="grid grid-cols-[75%_25%] gap-4">
        <div>
          <div className="mt-4">File Citation</div>
          <div className=" pt-4 pm-4 text-sm ">
            <div className="p-4 bg-[#f5f5f5] grid  ">
              <div className="pl-4">
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getFiletCitation(
                        metadata?.citation.fields,
                        dataset?.data.latestVersion.releaseTime.split("-")[0],
                        file?.data.dataFile.filename
                      ),
                    }}
                  ></span>

                  <a
                    href={file?.data.dataFile.pidURL}
                    className="text-hover-link-blue"
                    target="_blank"
                  >
                    {" "}
                    {file?.data.dataFile.pidURL}
                  </a>
                  {", " + dataset?.data.publisher + ", V" + file?.data.version}
                </div>

                <div className="grid grid-cols-[30%_70%] ">
                  <div className=" pt-4">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setCiteFileOpen(!citeFileOpen)}
                        className="cursor-pointer flex items-center text-hover-underline-blue "
                      >
                        <p className="relative flex items-center">
                          {" "}
                          <span className="mr-1">Cite Data File</span>
                          <ChevronDown size={14} />
                        </p>
                      </button>

                      {citeFileOpen && (
                        <div className="absolute z-10 mt-2  min-w-[250px]  bg-white border border-[#ccc] rounded shadow-lg px-6 py-2">
                          <CitationDownloadBlock />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-left pt-4">
                    Learn about{" "}
                    <a
                      href={
                        "https://dataverse.org/best-practices/data-citation"
                      }
                      className="text-hover-link-blue"
                      target="_black"
                    >
                      Data Citation Standards
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">Dataset Citation</div>

          <div className=" pt-4 pm-4 text-sm">
            <div className="p-4 custom-light-blue grid  ">
              <div className="pl-4">
                <div>
                  {getCitation(
                    metadata?.citation.fields,
                    dataset?.data.latestVersion.releaseTime.split("-")[0]
                  )}
                  <a
                    href={dataset?.data.persistentUrl}
                    className="text-hover-link-blue"
                    target="_blank"
                  >
                    {" "}
                    {dataset?.data.persistentUrl}
                  </a>
                  {", " +
                    dataset?.data.publisher +
                    ", V" +
                    dataset?.data.latestVersion.versionNumber}
                </div>

                <div className="grid grid-cols-[30%_70%] ">
                  <div className=" pt-4">
                    <div className="relative inline-block text-left">
                      <button
                        className="cursor-pointer flex items-center text-hover-underline-blue "
                        onClick={() => setCiteDatasetOpen(!citeDatasetOpen)}
                      >
                        <p className="relative flex items-center">
                          {" "}
                          <span className="mr-1">Cite Dataset</span>
                          <ChevronDown size={14} />
                        </p>
                      </button>

                      {citeDatasetOpen && (
                        <div className="absolute z-10 mt-2  min-w-[250px]  bg-white border border-[#ccc] rounded shadow-lg px-6 py-2">
                          <CitationDownloadBlock />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-left pt-4">
                    Learn about{" "}
                    <a
                      href={
                        "https://dataverse.org/best-practices/data-citation"
                      }
                      className="text-hover-link-blue"
                      target="_black"
                    >
                      Data Citation Standards
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 pm-4">
          <div className="relative inline-block text-left w-full">
            <button
              onClick={() => setAccessIsOpen(!accessIsOpen)}
              className="cursor-pointer flex justify-center items-center w-full p-2 primary-btn"
            >
              <p className="relative h-full">
                Access Files
                <i className="fa-solid fa-sort-down absolute left-[105%]"></i>
              </p>
            </button>

            {accessIsOpen && (
              <AccessFileBlock metadataFile={metadataFile} file={file} />
            )}
          </div>

          <div className="grid grid-cols-2 mb-[14px]">
            <button className="default-btn  flex justify-center items-center cursor-pointer ">
              Contact Owner
            </button>
            <button className="default-btn  bg-red-100 flex justify-center items-center cursor-pointer ">
              Share
            </button>
          </div>

          <div className="text-sm">
            <div> Dataset Metrics </div>
            {downloadCount && (
              <div className="p-4 border-l border-r border-b border-gray-300">
                {" "}
                {downloadCount} Downloads{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-[#ccc] mb-4 flex">
        <button
          className={
            navbar === "Metadata"
              ? "mr-4 cursor-pointer border-b border-[#337ab7] text-[#337ab7]"
              : "mr-4 cursor-pointer hover:border-b hover:border-[#337ab7] hover:text-[#337ab7] transition duration-300"
          }
          onClick={() => setNavbar("Metadata")}
        >
          Metadata
        </button>

        <button
          className={
            navbar === "Versions"
              ? "mr-4 cursor-pointer border-b border-[#337ab7] text-[#337ab7]"
              : "mr-4 cursor-pointer hover:border-b hover:border-[#337ab7] hover:text-[#337ab7] transition duration-300"
          }
          onClick={() => setNavbar("Versions")}
        >
          Versions
        </button>
      </div>

      {navbar === "Metadata" && (
        <FileMetadataBlock metadata={metadata} dataset={dataset} file={file} />
      )}
    </div>
  );
};

export default FIle;
