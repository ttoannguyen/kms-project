import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CreateEventEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill();
  const [initialized, setInitialized] = useState(false);

  // Set default value chỉ 1 lần khi quill init
  useEffect(() => {
    if (quill && !initialized) {
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }
      setInitialized(true);
    }
  }, [quill, initialized, value]);

  // Lắng nghe sự kiện thay đổi
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html);
      });
    }
  }, [quill, onChange]);

  return (
    <div className="w-full ">
      <div ref={quillRef} style={{ height: "300px", fontSize: "16px" }} />
    </div>
  );
};

export default CreateEventEditor;
