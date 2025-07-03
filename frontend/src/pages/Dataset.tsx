import { useState, useEffect, useRef } from "react";
import datasetApi from "@/services/DatasetApi";

import type {
  DatasetFile,
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";
import defaultFile from "../assets/img/muti_file_icon.png";

import { Link, useLocation, useSearchParams } from "react-router-dom";
import FileBlock from "@/components/FileBlock";
import MetadataBlock from "@/components/MetadataBlock";
import TermsBlock from "@/components/TermsBlock";
import VersionBlock from "@/components/VersionBlock";
import {
  getAuthorsTop,
  getCitation,
  getDescription,
  getSubjects,
  getTitle,
} from "@/helpers/metadataDataset/getMetadata";
import BreadcrumbBlock from "@/components/BreadcrumbBlock ";
import formatBytes from "@/helpers/format/formatSizeData";

// import "../../assets/icon/fontawesome/css/all.min.css";
// import defaultFile from "../../assets/img/muti_file_icon.png";
// import "../../global.css";

const Dataset = () => {
  const [searchParams] = useSearchParams();
  const persistentId = searchParams.get("persistentId");
  const location = useLocation();
  const dataverseApi = import.meta.env.VITE_DATAVERSE_URL;

  const [dataset, setDataset] = useState<DatasetInterface | null>(null);
  const [metadata, setMetadata] = useState<MetadataBlocks | null>(null);
  const [files, setFiles] = useState<DatasetFile[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathParts = location.pathname.split("/");
  const datasetId = pathParts[pathParts.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const [accessIsOpen, setAccessIsOpen] = useState(false);
  const [fullDescMode, setFullDescMode] = useState<boolean>(false);
  const [shortDescMode, setShortDescMode] = useState<boolean>(false);
  const descRef = useRef<HTMLDivElement>(null);
  const [navbar, setNavbar] = useState<string>("Files");
  const [downloadCount, setDownloadCount] = useState<{
    id: number;
    downloadCount: number;
  } | null>(null);
  const [downloadSize, setDownloadSize] = useState<{
    status: string;
    data: {
      message: string;
      storageSize: number;
    };
  } | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getDatasetItem = async (): Promise<void> => {
      setLoading(true);
      if (!persistentId) return;

      const tempDataset: DatasetInterface | null = await datasetApi.getDataset(
        persistentId,
        setError
      );

      if (tempDataset) {
        setDataset(tempDataset);
        setMetadata(tempDataset.data.latestVersion.metadataBlocks);
        setFiles(tempDataset.data.latestVersion.files);

        const tempDownloadCount: {
          id: number;
          downloadCount: number;
        } | null = await datasetApi.getDownloadCount(tempDataset.data.id);

        if (tempDownloadCount) {
          setDownloadCount(tempDownloadCount);
        }

        const tempDownloadSize = await datasetApi.getDownloadSize(
          tempDataset.data.id,
          tempDataset.data.latestVersion.versionNumber,
          tempDataset.data.latestVersion.versionMinorNumber
        );

        if (tempDownloadSize) {
          setDownloadSize(tempDownloadSize);
        }
      }

      setLoading(false);
    };

    getDatasetItem();
  }, [persistentId]);

  useEffect(() => {
    if (descRef.current) {
      const descHeight = descRef.current.scrollHeight;

      if (descHeight < 250) {
        setShortDescMode(true);
        setFullDescMode(true);
      }
    }
  }, [metadata]);

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading dataset...</p>
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

  if (!dataset) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-red-600">
          Dataset not found
        </h2>
        <p>The dataset with ID "{datasetId}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-base pt-[28px] pb-[28px] px-0">
        <Link
          className="block text-hover-underline-blue  mt-[5px] text-[18px] mb-[10px]"
          to={"/"}
        >
          {dataset.data.isPartOf?.displayName}
        </Link>
        <p style={{ color: "#666666" }}>
          {"(" + getAuthorsTop(metadata?.citation.fields) + ")"}
        </p>
      </div>

      {dataset?.data.isPartOf && (
        <BreadcrumbBlock isPartOf={dataset?.data.isPartOf} />
      )}

      {metadata?.citation.fields && (
        <h1 className="text-[36px] leading-[1.1] font-bold mt-4 mb-0">
          {getTitle(metadata?.citation.fields)}
        </h1>
      )}

      <span className="label-default">
        {"Version " + dataset?.data.latestVersion.versionNumber}
      </span>
      <div className="grid grid-cols-[75%_25%] gap-4">
        <div className=" pt-4 pm-4 text-sm">
          <div className="p-4 custom-light-blue grid grid-cols-[15%_85%] ">
            <div className="w-full text-xl ">
              <img src={defaultFile} alt="" />
            </div>
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
                      onClick={toggleDropdown}
                      className="cursor-pointer flex items-center text-hover-underline-blue "
                    >
                      <p className="relative">
                        {" "}
                        Cite Dataset
                        <i className="fa-solid fa-sort-down absolute left-[105%]"></i>
                      </p>
                    </button>

                    {isOpen && (
                      <div className="absolute z-10 mt-2 w-44 bg-white rounded shadow-lg border border-[#ccc]">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                        >
                          {/* {metadata.format} */}
                        </a>
                        {/* <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                          >
                            RIS
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                          >
                            Bib TeX
                          </a> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-left pt-4">
                  Learn about{" "}
                  <Link to={"/"} className="text-hover-link-blue">
                    Data Citation Standards
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pl-4 pr-4">
            <div className=" grid grid-cols-[30%_70%] gap-4">
              <div className="font-bold">Description</div>
              <div
                ref={descRef}
                className={
                  fullDescMode
                    ? "text-justify relative"
                    : "text-justify max-h-[250px] overflow-hidden relative"
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: getDescription(metadata?.citation.fields),
                  }}
                ></div>

                {!shortDescMode && (
                  <>
                    {fullDescMode ? (
                      <div className="text-center top-[100%] w-full absolute bottom-0">
                        <button
                          className="text-hover-underline-blue cursor-pointer"
                          onClick={() => setFullDescMode(false)}
                        >
                          Collapse Description [-]
                        </button>
                      </div>
                    ) : (
                      <div
                        className="text-center pt-[250px] w-full absolute bottom-0"
                        style={{
                          background:
                            "linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff 80%)",
                        }}
                      >
                        <button
                          className="text-hover-underline-blue cursor-pointer"
                          onClick={() => setFullDescMode(true)}
                        >
                          Read full Description [+]
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className=" mt-4 grid grid-cols-[30%_70%] gap-4">
              <div className="font-bold">Subject</div>
              <div>{metadata && getSubjects(metadata.citation.fields)}</div>
            </div>

            {/* <div className="mt-4 grid grid-cols-[30%_70%] gap-4">
              <div className="font-bold">Related Publication </div>
              <div>haha</div>
            </div> */}

            <div className="mt-4 grid grid-cols-[30%_70%] gap-4">
              <div className="font-bold">License/Data Use Agreement</div>
              <div className="flex">
                <img
                  src={dataset?.data.latestVersion.license.iconUri}
                  alt=""
                  className="mr-4"
                />
                <a
                  href={dataset?.data.latestVersion.license.uri}
                  className="text-hover-underline-blue underline"
                >
                  {dataset?.data.latestVersion.license.name}
                </a>
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
                Access Dataset
                <i className="fa-solid fa-sort-down absolute left-[105%]"></i>
              </p>
            </button>

            {accessIsOpen && (
              <div className="absolute z-10 mt-1 w-[90%] left-[10%] bg-white border border-[#ccc] rounded shadow-lg p-4">
                <p className="pl-4 text-[13px]">
                  Download Options
                  <i className="ml-2 fa-solid fa-download"></i>
                </p>

                {downloadSize?.data.storageSize && (
                  <a
                    href={`${dataverseApi}/access/dataset/:persistentId/?persistentId=${dataset.data.persistentUrl}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Download ZIP ({formatBytes(downloadSize?.data.storageSize)})
                  </a>
                )}
              </div>
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
            <div className="p-4 border-l border-r border-b border-gray-300">
              {" "}
              {downloadCount?.downloadCount} Downloads{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-[#ccc] mb-4 flex">
        <button
          className={
            navbar === "Files"
              ? "mr-4 cursor-pointer border-b border-[#337ab7] text-[#337ab7]"
              : "mr-4 cursor-pointer hover:border-b hover:border-[#337ab7] hover:text-[#337ab7] transition duration-300"
          }
          onClick={() => setNavbar("Files")}
        >
          Files
        </button>
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
            navbar === "Terms"
              ? "mr-4 cursor-pointer border-b border-[#337ab7] text-[#337ab7]"
              : "mr-4 cursor-pointer hover:border-b hover:border-[#337ab7] hover:text-[#337ab7] transition duration-300"
          }
          onClick={() => setNavbar("Terms")}
        >
          Terms
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
      {navbar === "Files" && (
        <FileBlock files={files} persistentUrl={dataset.data.persistentUrl} />
      )}
      {navbar === "Metadata" && (
        <MetadataBlock metadata={metadata} dataset={dataset} />
      )}

      {navbar === "Terms" && (
        <TermsBlock license={dataset?.data.latestVersion.license} />
      )}

      {navbar === "Versions" && <VersionBlock />}
    </div>
  );
};

export default Dataset;
