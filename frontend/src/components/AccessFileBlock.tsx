import type { DataFileResponse, GetMetadata } from "@/types/file";
import { Download, Earth, File, OctagonMinus } from "lucide-react";
import { useState } from "react";
import CitationDownloadBlock from "./CitationDownloadBlock";
interface ChildProps {
  metadataFile: GetMetadata | null;
  file: DataFileResponse | null;
}

const AccessFileBlock: React.FC<ChildProps> = ({ metadataFile, file }) => {
  const [citationOpen, setCitationOpen] = useState<boolean>(true);
  const dataverseApi = import.meta.env.VITE_DATAVERSE_URL;

  return (
    <div className="absolute z-10 mt-1 min-w-[160px] right-[0] bg-white border border-[#ccc] rounded shadow-lg px-6 py-2">
      <div className="relative">
        <div className="pb-2  py-2">
          <div className="flex items-center text-[#777]">
            <p className="text-[14px]  mr-2">File Access</p>
            <File size={12} />
          </div>

          {!metadataFile?.restricted ? (
            <p className="   text-[#006600]  flex items-center">
              <Earth size={14} className="mr-2" />
              Public
            </p>
          ) : (
            <p className="  text-gray-800  flex">
              <OctagonMinus size={14} color="#FF0000" />
              Restrict
            </p>
          )}
        </div>

        {!metadataFile?.restricted && (
          <div className="pb-2 cursor-pointer">
            <div className="flex items-center text-[#777]">
              <p className="text-[14px]  mr-2">Download Options</p>
              <Download size={12} />
            </div>

            {file && (
              <a
                href={`${dataverseApi}/access/datafile/${file.data.dataFile.id}`}
                className=" hover:bg-gray-100 flex items-center"
              >
                {file.data.dataFile.friendlyType}
              </a>
            )}
          </div>
        )}

        {!metadataFile?.restricted && (
          <div className="pb-2">
            <div className="flex items-center text-[#777] ">
              <p className="text-[14px]  mr-2">Download Metadata </p>
              <Download size={12} />
            </div>

            <p
              className="hover:bg-gray-100 flex items-center cursor-pointer"
              onMouseEnter={() => setCitationOpen(true)}
              onMouseLeave={() => setCitationOpen(false)}
            >
              Data File Citation
            </p>
          </div>
        )}

        {citationOpen && (
          <div
            className="absolute z-10 mt-1 min-w-[250px] top-[80%] right-[100%] bg-white border border-[#ccc] rounded shadow-lg px-6 py-2"
            onMouseEnter={() => setCitationOpen(true)}
            onMouseLeave={() => setCitationOpen(false)}
          >
            <CitationDownloadBlock />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessFileBlock;
