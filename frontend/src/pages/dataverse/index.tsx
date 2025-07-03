import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DataverseList from "./DataverseList";
import DataversePagination from "./DataversePagination";
import { getCountData, getDataverses } from "@/services/DataverseApi";
import { type DataverseItem } from "./types";
import type { CountData } from "@/types/Dataverse/dataverse";
import DataverseSideBar from "./DataverseSideBar";
import Search from "./Search";

const DataversePage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "*";
  const sort = params.get("sort") ?? "date";
  const order = params.get("order") ?? "desc";
  const page = parseInt(params.get("page") ?? "1");
  const perPage = parseInt(params.get("per_page") ?? "6");
  const subtree = params.get("subtree") ?? undefined;

  const [items, setItems] = useState<DataverseItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [numberCountSideBar, setNumberCountSideBar] = useState<CountData>({
    totalDatasets: 0,
    rootDataverse: 0,
    totalDataverses: 0,
    totalFiles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountData().then((countRes) => {
      setNumberCountSideBar(countRes);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDataverses({
      q: q || undefined,
      sort,
      order,
      page,
      perPage,
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      subtree,
    })
      .then((dataRes) => {
        console.log("dataRes", dataRes);
        setItems(dataRes.items);
        setTotal(dataRes.total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q, sort, order, page, perPage, selectedTypes, subtree]); // Added subtree to dependencies

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => {
      if (checked) {
        return [...prev, type];
      } else {
        return prev.filter((t) => t !== type);
      }
    });
  };

  return (
    <div className="flex gap-4 border p-2">
      <DataverseSideBar
        data={numberCountSideBar}
        selectedTypes={selectedTypes}
        onTypeChange={handleTypeChange}
      />

      <div className="flex-1 w-full">
        <div className="mb-4 w-full">
          <Search onSearch={(query) => console.log("Search query:", query)} />
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