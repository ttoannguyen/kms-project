// components/LoadingScreen.tsx
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingScreen({
  message = "Upload Data...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-xl flex flex-col items-center justify-center z-[100]">
      <ClipLoader color="#2563eb" size={50} />
      <p className="mt-4 text-lg text-gray-700">{message}</p>
    </div>
  );
}
