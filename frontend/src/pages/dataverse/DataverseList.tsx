import { Link } from "react-router-dom";
import { type DataverseItem } from "./types";

const formatSize = (bytes?: number) =>
  bytes && bytes > 0
    ? bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`
    : "0 KB";

const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return "📕";
  if (type.includes("zip") || type.includes("tar")) return "🗜️";
  if (type.includes("csv") || type.includes("spreadsheet")) return "📊";
  if (type.includes("text")) return "📄";
  return "📁";
};

const DataverseList = ({
  items,
  loading,
}: {
  items: DataverseItem[];
  loading?: boolean;
}) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="text-gray-600 text-sm animate-pulse">
            Đang tải dữ liệu...
          </div>
        </div>
      )}

      <ul
        className={`space-y-1 transition-opacity duration-300 ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {items.map((item, index) => {
          switch (item.type) {
            case "dataset":
              return (
                <li
                  key={item.global_id}
                  className="relative border border-blue-300 p-4 bg-white shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <Link
                        to={`/dataset?persistentId=${item.global_id}`}
                        className="text-lg hover:underline font-semibold text-blue-800 mb-1"
                      >
                        {item.name || "Dataset Name"}
                      </Link>

                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(
                          item.published_at || item.createdAt || ""
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {" – "}
                        <Link
                          to={`/dataverse?q=${item.identifier_of_dataverse}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name_of_dataverse || "Unknown Dataverse"}
                        </Link>
                      </p>

                      {item.citationHtml ? (
                        <div
                          className="text-sm text-gray-800 bg-blue-50 px-2 py-1 rounded"
                          dangerouslySetInnerHTML={{ __html: item.citationHtml }}
                        />
                      ) : item.citation ? (
                        <div className="text-sm text-gray-800 bg-blue-50 px-2 py-1 rounded">
                          {item.citation}
                        </div>
                      ) : null}

                      {item.description && (
                        <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );

            case "file": {
              // const isImage = item.file_content_type?.startsWith("image/");
              const showThumb =
                item.image_url;

              return (
                <li
                  key={item.file_id || `file-${index}`}
                  className="border border-gray-400 p-4 bg-white relative shadow-sm"
                >
                  <div className="flex">
                    <div className="w-16 h-16 mr-4 flex-shrink-0 bg-gray-50 rounded overflow-hidden flex items-center justify-center text-3xl text-gray-500">
                      {showThumb ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getFileIcon(item.file_content_type || "")
                      )}
                    </div>

                    <div className="flex-1">
                      <Link
                        to={`/file?fileId=${item.file_id}`}
                        className="text-blue-700 font-semibold hover:underline break-all"
                      >
                        {item.name || "File Name"}
                      </Link>

                      <p className="text-gray-600 text-sm mt-0.5">
                        {new Date(item.published_at || "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}{" "}
                        – {item.file_type}
                      </p>

                      <p className="text-gray-600 text-sm mt-1">
                        {formatSize(item.size_in_bytes)} – MD5:{" "}
                        <span className="font-mono text-xs bg-gray-100 px-1 rounded">
                          {item.md5?.slice(0, 6)}...{item.md5?.slice(-4)}
                        </span>
                      </p>

                      {item.description?.startsWith("http") && (
                        <a
                          href={item.description}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm mt-1 block break-all"
                        >
                          {item.description}
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            }

            case "dataverse":
              return (
                <li
                  key={item.identifier || `dataverse-${index}`}
                  className="relative border border-orange-600 p-4 bg-white shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <Link
                        to={`/dataverse?q=${item.identifier}`}
                        className="text-lg font-semibold text-blue-700 hover:underline"
                      >
                        {item.name || "Dataverse"}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(item.published_at || "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );

            default:
              return (
                <li
                  key={`unknown-${index}`}
                  className="border rounded-lg p-4 shadow-sm bg-red-50 text-red-700"
                >
                  <p>Unknown type: {(item as DataverseItem)?.type ?? "N/A"}</p>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export default DataverseList;
