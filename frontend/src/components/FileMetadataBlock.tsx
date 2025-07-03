import { formatDateOnly } from "@/helpers/format/formatDate";
import formatBytes from "@/helpers/format/formatSizeData";
import { getDepositDate } from "@/helpers/metadataDataset/getMetadata";

import type {
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";
import type { DataFileResponse } from "@/types/file";
import { Download } from "lucide-react";

interface ChildProps {
  metadata: MetadataBlocks | null;
  dataset: DatasetInterface | null;
  file: DataFileResponse | null;
}
const FileMetadataBlock: React.FC<ChildProps> = ({
  metadata,
  dataset,
  file,
}) => {
  const dataverseApi = import.meta.env.VITE_DATAVERSE_URL;

  // const [metadataFile, setMetadataFile] = useState<{
  //   label: string;
  //   restricted: boolean;
  //   id: number;
  // } | null>(null);

  // useEffect(() => {
  //   const getMetadataFile = async (): Promise<void> => {
  //     if (file?.data.dataFile.id) {
  //       const tempDatadataFile: {
  //         label: string;
  //         restricted: boolean;
  //         id: number;
  //       } | null = await fileApi.getMetadataFile(file?.data.dataFile.id);

  //       if (tempDatadataFile) {
  //         const previewLink: string = fileApi.getPreview(
  //           file?.data.dataFile.id,
  //           tempDatadataFile?.id,
  //           file.data.dataFile.contentType
  //         );
  //         console.log(previewLink);
  //       }
  //     }
  //   };

  //   getMetadataFile();
  // }, [file?.data.dataFile.id]);

  return (
    <div className="border border-[#ccc] rounded-[5px] px-[20px] py-[10px]">
      <div className=""></div>

      <div className=" pl-4 pr-4">
        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">File Persistent ID </div>
          <div className="text-justify ">
            {file?.data.dataFile.persistentId}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Publication Date </div>
          <div className="text-justify ">{dataset?.data.publicationDate}</div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Download</div>
          <div className="text-justify flex items-center">
            {/* {metadata?.citation.fields[0].value} */}

            <a
              href={`${dataverseApi}/access/datafile/${file?.data.dataFile.id}`}
              className="border border-[#337ab7] hover:border-[#23527c] rounded-[5px] px-8 py-2 cursor-pointer text-[#337ab7] hover:text-[#23527c]"
            >
              <Download />
            </a>
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">{file?.data.dataFile.checksum.type} </div>
          <div className="text-justify ">
            {file?.data.dataFile.checksum.value}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Deposit Date</div>
          <div className="text-justify ">
            {getDepositDate(metadata?.citation.fields)}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Metadata Release Date</div>

          {dataset?.data.latestVersion.releaseTime && (
            <div className="text-justify ">
              {formatDateOnly(dataset?.data.latestVersion.releaseTime)}
            </div>
          )}
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Publication Date</div>
          <div className="text-justify ">
            {file?.data.dataFile.publicationDate}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Size</div>
          {file?.data.dataFile.filesize && (
            <div className="text-justify ">
              {formatBytes(file?.data.dataFile.filesize)}
            </div>
          )}
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Type</div>

          {file?.data.dataFile.friendlyType && (
            <div className="text-justify ">
              {file?.data.dataFile.friendlyType}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileMetadataBlock;
