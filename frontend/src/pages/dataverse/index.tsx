// // import { useSearchParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import DataverseList from "./DataverseList";
// // import DataversePagination from "./DataversePagination";
// // import { getCountData, getDataverses } from "@/services/DataverseApi";
// // import { type DataverseItem } from "./types";
// // import type { CountData } from "@/types/Dataverse/dataverse";
// // import DataverseSideBar from "./DataverseSideBar";
// // import Search from "./Search";

// // const DataversePage = () => {
// //   const [params] = useSearchParams();
// //   const q = params.get("q") ?? "*";
// //   const sort = params.get("sort") ?? "date";
// //   const order = params.get("order") ?? "desc";
// //   const page = parseInt(params.get("page") ?? "1");
// //   const perPage = parseInt(params.get("per_page") ?? "6");
// //   const subtree = params.get("subtree") ?? undefined;

// //   const [items, setItems] = useState<DataverseItem[]>([]);
// //   const [total, setTotal] = useState(0);
// //   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
// //   const [numberCountSideBar, setNumberCountSideBar] = useState<CountData>({
// //     totalDatasets: 0,
// //     rootDataverse: 0,
// //     totalDataverses: 0,
// //     totalFiles: 0,
// //   });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     getCountData().then((countRes) => {
// //       setNumberCountSideBar(countRes);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     setLoading(true);
// //     getDataverses({
// //       q: q || undefined,
// //       sort,
// //       order,
// //       page,
// //       perPage,
// //       types: selectedTypes.length > 0 ? selectedTypes : undefined,
// //       subtree,
// //     })
// //       .then((dataRes) => {
// //         console.log("dataRes", dataRes);
// //         setItems(dataRes.items);
// //         setTotal(dataRes.total);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [q, sort, order, page, perPage, selectedTypes, subtree]); // Added subtree to dependencies

// //   const handleTypeChange = (type: string, checked: boolean) => {
// //     setSelectedTypes((prev) => {
// //       if (checked) {
// //         return [...prev, type];
// //       } else {
// //         return prev.filter((t) => t !== type);
// //       }
// //     });
// //   };

// //   return (
// //     <div className="flex gap-4 border p-2">
// //       <DataverseSideBar
// //         data={numberCountSideBar}
// //         selectedTypes={selectedTypes}
// //         onTypeChange={handleTypeChange}
// //       />

// //       <div className="flex-1 w-full">
// //         <div className="mb-4 w-full">
// //           <Search onSearch={(query) => console.log("Search query:", query)} />
// //         </div>

// //         <DataverseList items={items} loading={loading} />

// //         {!loading && total > 0 && (
// //           <DataversePagination page={page} total={total} perPage={perPage} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DataversePage;

// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DataverseList from "./DataverseList";
// import DataversePagination from "./DataversePagination";
// import { getCountData, getDataverses } from "@/services/DataverseApi";
// import { type DataverseItem } from "./types";
// import type { CountData } from "@/types/Dataverse/dataverse";
// import DataverseSideBar from "./DataverseSideBar";
// import Search from "./Search";

// const DataversePage = () => {
//   const [params] = useSearchParams();

//   const q = params.get("q") ?? "*";
//   const sort = params.get("sort") ?? "date";
//   const order = params.get("order") ?? "desc";
//   const page = parseInt(params.get("page") ?? "1", 10) || 1;
//   const perPage = parseInt(params.get("per_page") ?? "6", 10) || 6;
//   const subtree = params.get("subtree") || undefined;

//   const [items, setItems] = useState<DataverseItem[]>([]);
//   const [total, setTotal] = useState(0);
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
//   const [numberCountSideBar, setNumberCountSideBar] = useState<CountData>({
//     totalDatasets: 0,
//     rootDataverse: 0,
//     totalDataverses: 0,
//     totalFiles: 0,
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch count data for sidebar once
//   useEffect(() => {
//     getCountData()
//       .then(setNumberCountSideBar)
//       .catch((err) => console.error("Failed to fetch count data:", err));
//   }, []);

//   // Fetch dataverses when search/filter changes
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const { items, total } = await getDataverses({
//           q,
//           sort,
//           order,
//           page,
//           perPage,
//           types: selectedTypes.length ? selectedTypes : undefined,
//           subtree,
//         });
//         setItems(items);
//         setTotal(total);
//       } catch (err) {
//         console.error("Failed to fetch dataverses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [q, sort, order, page, perPage, selectedTypes, subtree]);

//   const handleTypeChange = (type: string, checked: boolean) => {
//     setSelectedTypes((prev) =>
//       checked ? [...prev, type] : prev.filter((t) => t !== type)
//     );
//   };

//   return (
//     <div className="flex gap-4 border p-2">
//       <DataverseSideBar
//         data={numberCountSideBar}
//         selectedTypes={selectedTypes}
//         onTypeChange={handleTypeChange}
//       />

//       <div className="flex-1 w-full">
//         <div className="mb-4 w-full">
//           <Search onSearch={(query) => console.log("Search query:", query)} />
//         </div>

//         <DataverseList items={items} loading={loading} />

//         {!loading && total > 0 && (
//           <DataversePagination page={page} total={total} perPage={perPage} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataversePage;
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import DataverseList from "./DataverseList";
import DataversePagination from "./DataversePagination";
import DataverseSideBar from "./DataverseSideBar";
import Search from "./Search";

import { getCountData, getDataverses } from "@/services/DataverseApi";
import { type DataverseItem } from "./types";
import type { CountData } from "@/types/Dataverse/dataverse";

const DataversePage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Read query parameters
  const q = params.get("q") ?? "*";
  const sort = params.get("sort") ?? "dateSort";
  const order = params.get("order") ?? "desc";
  const page = parseInt(params.get("page") ?? "1", 10) || 1;
  const perPage = parseInt(params.get("per_page") ?? "6", 10) || 6;
  const subtree = params.get("subtree") || undefined;

  const [items, setItems] = useState<DataverseItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [numberCountSideBar, setNumberCountSideBar] = useState<CountData>({
    totalDatasets: 0,
    rootDataverse: 0,
    totalDataverses: 0,
    totalFiles: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountData()
      .then(setNumberCountSideBar)
      .catch((err) => console.error("Failed to fetch count data:", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { items, total } = await getDataverses({
          q,
          sort,
          order,
          page,
          perPage,
          types: selectedTypes.length > 0 ? selectedTypes : undefined,
          subtree,
        });
        setItems(items);
        setTotal(total);
      } catch (err) {
        console.error("Failed to fetch dataverses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, sort, order, page, perPage, selectedTypes, subtree]);

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);
    newParams.set("page", "1"); // Reset page
    navigate(`?${newParams.toString()}`);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParam("per_page", e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortValue, orderValue] = e.target.value.split("-");
    const newParams = new URLSearchParams(params.toString());
    newParams.set("sort", sortValue);
    newParams.set("order", orderValue);
    newParams.set("page", "1"); // Reset page on sort change
    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-4 border p-2">
      <DataverseSideBar
        data={numberCountSideBar}
        selectedTypes={selectedTypes}
        onTypeChange={handleTypeChange}
      />

      <div className="flex-1 w-full">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Search onSearch={(query) => console.log("Search query:", query)} />

          <div className="flex gap-2 max-w-80 items-center">
            <div className="flex flex-row items-center w-42">
              <label htmlFor="sort" className="text-sm mr-1">
                Sort by:
              </label>
              <select
                id="sort"
                value={`${sort}-${order}`}
                onChange={handleSortChange}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="dateSort-desc">Newest</option>
                <option value="dateSort-asc">Oldest</option>
                <option value="nameSort-asc">Name A-Z</option>
                <option value="nameSort-desc">Name Z-A</option>
              </select>
            </div>

            <div className="flex flex-row items-center w-36">
              <label htmlFor="perPage" className="text-sm mr-1">
                Per Page:
              </label>
              <select
                id="perPage"
                value={perPage}
                onChange={handlePerPageChange}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </div>
          </div>
        </div>

        <DataverseList items={items} loading={loading} />

        {!loading && total > 0 && (
          <DataversePagination page={page} total={total} perPage={perPage} />
        )}
      </div>
    </div>
  );
};

export default DataversePage;

