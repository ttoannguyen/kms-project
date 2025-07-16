import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Upload } from "lucide-react";

const FileDropZone = ({
  files,
  onFilesSelected,
}: {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected([...files, ...acceptedFiles]);
    },
    [files, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-4 rounded-xl cursor-pointer text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>📥 Thả file vào đây...</p>
      ) : (
        <div className="flex items-center flex-col    ">
          <Upload size={40} />
          <p>Select a file or drag and drop files here.</p>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
