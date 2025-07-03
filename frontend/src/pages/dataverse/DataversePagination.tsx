import { useSearchParams } from "react-router-dom";

const DataversePagination = ({
  page,
  total,
  perPage,
}: {
  page: number;
  total: number;
  perPage: number;
}) => {
  const [, setParams] = useSearchParams();
  const totalPages = Math.ceil(total / perPage);

  const goTo = (newPage: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage.toString());
      return next;
    });
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  return (
    <div className="flex gap-2 mt-4 justify-center items-center flex-wrap">
      <button
        onClick={() => goTo(1)}
        disabled={page === 1}
        className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>
      <button
        onClick={() => goTo(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      {getVisiblePages().map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`px-3 py-1 rounded cursor-pointer ${
            page === p ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goTo(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
      <button
        onClick={() => goTo(totalPages)}
        disabled={page === totalPages}
        className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
  );
};

export default DataversePagination;
