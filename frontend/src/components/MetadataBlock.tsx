import {
  getAuthors,
  getDepositDate,
  getDepositor,
  getDescription,
  getKeywords,
  getPublications,
  getSubjects,
  getTitle,
} from "@/helpers/metadataDataset/getMetadata";
import type {
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";
import React from "react";

interface ChildProps {
  metadata: MetadataBlocks | null;
  dataset: DatasetInterface | null;
}
const MetadataBlock: React.FC<ChildProps> = ({ metadata, dataset }) => {
  console.log(metadata);

  return (
    <div className="border border-[#ccc] rounded-[5px] px-[20px] py-[10px]">
      <div className=" pl-4 pr-4">
        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Persistent Identifier </div>
          <div className="text-justify ">
            {dataset?.data.latestVersion.datasetPersistentId}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Publication Date </div>
          <div className="text-justify ">{dataset?.data.publicationDate}</div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Title </div>
          <div className="text-justify ">
            {getTitle(metadata?.citation.fields)}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Author </div>
          <div className="text-justify ">
            {getAuthors(metadata?.citation.fields)}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Description</div>
          <div
            className=" "
            dangerouslySetInnerHTML={{
              __html: getDescription(metadata?.citation.fields),
            }}
          ></div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Subject</div>
          {getSubjects(metadata?.citation.fields)}
        </div>

        {getKeywords(metadata?.citation.fields) !== "" && (
          <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
            <div className="font-bold">Keyword </div>
            {getKeywords(metadata?.citation.fields)}
          </div>
        )}

        {getPublications(metadata?.citation.fields) !== "" && (
          <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
            <div className="font-bold">Related Publication </div>
            <div
              dangerouslySetInnerHTML={{
                __html: getPublications(metadata?.citation.fields),
              }}
            ></div>
          </div>
        )}

        {getDepositor(metadata?.citation.fields) !== "" && (
          <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
            <div className="font-bold">Depositor </div>
            {getDepositor(metadata?.citation.fields)}
          </div>
        )}

        {getDepositDate(metadata?.citation.fields) && (
          <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
            <div className="font-bold">Deposit Date </div>
            {getDepositDate(metadata?.citation.fields)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetadataBlock;
