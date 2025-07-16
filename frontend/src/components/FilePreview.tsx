import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip } from "react-tooltip";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type FilePreviewProps = {
  file: File;
  index: number;
  onDelete: (file: File) => void;
};

const FilePreview: React.FC<FilePreviewProps> = ({ file, index, onDelete }) => {
  const fileType = file.type;

  if (fileType.startsWith("image/")) {
    // Preview hình ảnh
    return (
      <div className="p-2 border rounded flex w-full justify-between">
        <div className="flex ">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-[100px] h-[100px] rounded shadow mr-2"
          />
          <p className="text-[16px] text-center mt-2">{file.name}</p>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            className="cursor-pointer "
            data-tooltip-id={`my-tooltip_${index}`}
            data-tooltip-content="Delete file"
            onClick={() => onDelete(file)}
          >
            <Trash className="w-12 h-12 text-red-500" /> {/* 48px x 48px */}
          </Button>

          <Tooltip id={`my-tooltip_${index}`} place="left" />
        </div>
      </div>
    );
  }

  if (fileType === "application/pdf") {
    // Preview PDF
    return (
      <div className="p-2 border rounded flex  w-full justify-between ">
        <div className="flex">
          <Document file={file} className="mr-2 border border-[#ccc]">
            <Page
              pageNumber={1}
              width={100}
              height={100}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <p className="text-sm text-center mt-2">{file.name}</p>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            className="cursor-pointer "
            data-tooltip-id={`my-tooltip_${index}`}
            data-tooltip-content="Delete file"
            onClick={() => onDelete(file)}
          >
            <Trash className="w-12 h-12 text-red-500" /> {/* 48px x 48px */}
          </Button>

          <Tooltip id={`my-tooltip_${index}`} place="left" />
        </div>
      </div>
    );
  }

  if (
    file.name.endsWith(".doc") ||
    file.name.endsWith(".docx") ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // Không thể render trực tiếp Word trong browser an toàn => Hiển thị tên
    return (
      <div className="flex items-center gap-2 p-2 border rounded w-full justify-between">
        <div className="flex">
          <FileText className="w-[100px] h-[100px] text-blue-500 border border-[#ccc] mr-2" />
          <span>{file.name}</span>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            className="cursor-pointer "
            data-tooltip-id={`my-tooltip_${index}`}
            data-tooltip-content="Delete file"
            onClick={() => onDelete(file)}
          >
            <Trash className="w-12 h-12 text-red-500" /> {/* 48px x 48px */}
          </Button>

          <Tooltip id={`my-tooltip_${index}`} place="left" />
        </div>
      </div>
    );
  }

  // Default preview cho các loại file khác
  return (
    <div className="flex items-center gap-2 p-2 border rounded w-full justify-between">
      <div className="flex">
        <FileIcon className="w-[100px] h-[100px] text-gray-500 mr-2 border border-[#ccc]" />
        <p className="text-[16px] text-center mt-2">{file.name}</p>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          className="cursor-pointer "
          data-tooltip-id={`my-tooltip_${index}`}
          data-tooltip-content="Delete file"
          onClick={() => onDelete(file)}
        >
          <Trash className="w-12 h-12 text-red-500" /> {/* 48px x 48px */}
        </Button>

        <Tooltip id={`my-tooltip_${index}`} place="left" />
      </div>
    </div>
  );
};

export default FilePreview;
