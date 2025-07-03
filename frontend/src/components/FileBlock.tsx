import type { DatasetFile } from "@/types/datasetInterface";
import { Check, ClipboardCopy, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import fileImg from "../assets/img/muti_file_icon.png";
import DatasetFilePagination from "./pagination/DatasetFilePagination";
import formatBytes from "@/helpers/format/formatSizeData";
import formatDate from "@/helpers/format/formatDate";
import { Link } from "react-router-dom";

interface ChildProps {
  files: DatasetFile[] | null;
  persistentUrl: string;
}

const FileBlock: React.FC<ChildProps> = ({ files, persistentUrl }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedId, setCheckedId] = useState<number | null>(null);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const dataverseApi = import.meta.env.VITE_DATAVERSE_URL;
  const offset = currentPage * itemsPerPage;

  let currentItems: DatasetFile[] = [];
  let pageCount: number = 0;

  const handleToggleAll = () => {
    if (isCheckAll) {
      // Bỏ chọn tất cả file trong trang hiện tại
      setCheckedIds([]);
      setIsCheckAll(false);
    } else {
      // Thêm tất cả file hiện tại nếu chưa có
      const newIds = currentItems
        .map((file) => file.dataFile.id)
        .filter((id) => !checkedIds.includes(id));

      setCheckedIds((prev) => [...prev, ...newIds]);
      setIsCheckAll(true);
    }
  };

  const handleToggleOne = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!files) return;

    const offset = currentPage * itemsPerPage;
    const currentPageItems =
      files.length > itemsPerPage
        ? files.slice(offset, offset + itemsPerPage)
        : files;

    if (currentPageItems.length > 0) {
      const allChecked = currentPageItems.every((item) =>
        checkedIds.includes(item.dataFile.id)
      );
      setIsCheckAll(allChecked);
    }
  }, [files, currentPage, itemsPerPage, checkedIds]);

  if (files) {
    if (files.length > 10) {
      currentItems = files.slice(offset, offset + itemsPerPage);
      pageCount = Math.ceil(files.length / itemsPerPage);
    } else {
      currentItems = files;
      pageCount = 1;
    }
  }

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 10000);
    });
  };

  const handleDownload = async (): Promise<void> => {
    try {
      if (checkedIds.length === 0) {
        alert("Hãy chọn file");
      } else {
        if (isCheckAll) {
          if (persistentUrl) {
            window.open(
              `${dataverseApi}/access/dataset/:persistentId/?persistentId=${persistentUrl}`
            );
          }
        } else {
          checkedIds.forEach((id) => {
            window.open(`${dataverseApi}/access/datafile/${id}`, "_blank");
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFileText = (): string => {
    if (files) {
      const total = files?.length;
      if (total === 0) return "0 Files";

      if (total < 11) return `1 to ${total} of ${total} Files`;

      if (currentPage + 1 === pageCount) {
        return `  ${currentPage * itemsPerPage + 1} to ${total} of 
                  ${total} Files`;
      } else {
        return ` ${currentPage * itemsPerPage + 1} to
                  ${(currentPage + 1) * itemsPerPage} of ${total} Files`;
      }
    }
    return "NaN";
  };

  return (
    <div>
      <div className="border  border-[#ccc]">
        <div className="flex justify-between p-4 bg-[#f5f5f5] items-center border-b  border-[#ccc]">
          <input
            className="w-[20px] h-[20px] cursor-pointer pl-2"
            type="checkbox"
            name=""
            id=""
            onChange={handleToggleAll}
            checked={isCheckAll}
          />

          <span className="w-[80%]">{getFileText()}</span>

          <button
            onClick={() => handleDownload()}
            className="flex cursor-pointer mr-2 bg-gradient-to-b from-white to-[#e0e0e0] bg-repeat-x border border-[#ccc] px-[10px] py-[5px] hover:text-[#333] hover:bg-[#e6e6e6] hover:border-[#adadad] rounded-[5px]"
            style={{ textShadow: "0 1px 0 #fff" }}
          >
            <Download />
            Download
          </button>
        </div>

        {currentItems.length !== 0 &&
          currentItems.map((currentItem, index) => (
            <div
              className={
                checkedId === currentItem.dataFile.id
                  ? "flex background-[#ffffcc]"
                  : "flex"
              }
              key={index}
            >
              <div className="flex justify-center items-center border-r border-b  border-[#ccc] w-[5%]">
                <input
                  type="checkbox"
                  className="w-[20px] h-[20px] cursor-pointer"
                  checked={checkedIds.includes(currentItem.dataFile.id)}
                  onChange={() => {
                    handleToggleOne(currentItem.dataFile.id);
                  }}
                />
              </div>
              <div className="flex justify-between items-center  w-[95%] py-2 border-b border-[#ccc]">
                <div className="flex justify-between items-center ">
                  <img
                    src={fileImg}
                    alt=""
                    className="w-[62px] h-[62px] mr-4"
                  />
                  <div className="text-[14px]">
                    <Link
                      to={`/file?fileId=${currentItem.dataFile.id}`}
                      className="text-hover-underline-blue cursor-pointer"
                    >
                      {currentItem.label}
                    </Link>
                    <p className="text-[85%] color-[#707070]">
                      {currentItem.dataFile.friendlyType} -{" "}
                      {formatBytes(currentItem.dataFile.filesize)}
                    </p>
                    <p className="text-[85%] color-[#707070]">
                      Published{" "}
                      {formatDate(currentItem.dataFile.publicationDate)}
                    </p>
                    {/* <p className="text-[85%]color-[#707070]">2 Downloads</p> */}
                    <p className="text-[85%] color-[#707070] flex items-center">
                      {currentItem.dataFile.checksum.type +
                        " " +
                        currentItem.dataFile.checksum.value}
                      {copiedId === currentItem.dataFile.checksum.value ? (
                        <Check
                          size={18}
                          color="#00CC00"
                          className="transition duration-300 ml-2
"
                        />
                      ) : (
                        <ClipboardCopy
                          size={18}
                          className="cursor-pointer transition duration-300 ml-2"
                          onClick={() =>
                            handleCopy(currentItem.dataFile.checksum.value)
                          }
                        />
                      )}
                    </p>
                  </div>
                </div>
                <a
                  href={`${dataverseApi}/access/datafile/${currentItem.dataFile.id}`}
                  className="pr-4 cursor-pointer"
                >
                  <Download size={40} className="text-hover-blue " />
                </a>
              </div>
            </div>
          ))}
      </div>

      {files && (
        <>
          {files?.length > 10 && (
            <DatasetFilePagination
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FileBlock;
