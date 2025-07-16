import FileDropZone from "@/components/FileDropZone";
import FilePreview from "@/components/FilePreview";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full ">
        <FileDropZone files={files} onFilesSelected={setFiles} />
      </div>

      <div className="w-full">
        {files.length > 0 && (
          <ul className="mt-4 text-left text-sm">
            {files.map((file, i) => (
              <FilePreview key={i} file={file} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
