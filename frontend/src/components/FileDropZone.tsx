import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Upload } from "lucide-react";

const FileDropZone = ({
  file,
  onFileSelected,
}: {
  file: File | null;
  onFileSelected: (file: File) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]); // chỉ lấy file đầu tiên
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // ❌ Chỉ cho 1 file
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-4 rounded-xl cursor-pointer text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>📥 Thả file vào đây...</p>
      ) : file ? (
        <p>📄 {file.name}</p>
      ) : (
        <div className="flex items-center flex-col">
          <Upload size={40} />
          <p>Select a file or drag and drop here.</p>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
