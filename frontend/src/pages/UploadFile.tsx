import { CategoryCheckboxGroup } from "@/components/CategoryCheckboxGroup";
import FileDropZone from "@/components/FileDropZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import datasetApi from "@/services/DatasetApi";
import axios from "axios";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import OneFilePreview from "@/components/OneFilePreview";
import fileApi from "@/services/fileApi";
import LoadingScreen from "@/components/LoadingScreen";

const UploadFile = () => {
  // const baseURL = import.meta.env.VITE_API_BASE_URL;
  const dataverseHost = import.meta.env.VITE_DATAVERSE_HOST;
  const baseURL = "https://demo.dataverse.org";
  // const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [restrict, setRestrict] = useState<string>("false");
  const [categories, setCategories] = useState<string[]>(["Plot level data"]);

  const [apiToken, setApiToken] = useState<string>("");
  const [dataset, setDataset] = useState<string>("");
  const [datasetForUploadFiles, setDatasetForUploadFiles] = useState<any>(null);

  // const handleFileDelete = (fileToDelete: File) => {
  //   const updateFile = files.filter((file) => file !== fileToDelete);

  //   setFiles(updateFile);
  // };

  const getDatasetForUploadFile = async (pageNumber: number): Promise<void> => {
    setLoading(true);
    if (apiToken !== "") {
      try {
        const tempDataset = await datasetApi.getDatasetForUploadFile(
          apiToken,
          pageNumber
        );

        if (tempDataset) {
          setDatasetForUploadFiles(tempDataset);

          console.log(tempDataset);

          setLoading(false);
          toast.success("Get Dataset successfully", toastSuccessStyle);
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "❌ API error:",
            error.response?.status,
            error.response?.data
          );
        } else {
          console.error("❌ Unknown error:", error);
        }
      }

      setLoading(false);
      toast.error("API TOKEN is incorrect", toastErrorStyle);
      return;
    } else {
      setLoading(false);
      toast.error("Please enter API TOKEN", toastErrorStyle);
    }
  };

  useEffect(() => {
    const getInitStateForm = () => {
      if (file) {
        setFileName(file.name);
      }
    };
    getInitStateForm();
  }, [file]);

  const handleSubmit = async (): Promise<void> => {
    if (!file) {
      toast.error("Please upload a file.", toastErrorStyle);

      return;
    }

    if (!apiToken?.trim()) {
      toast.error("API Token is required.", toastErrorStyle);
      return;
    }

    if (!fileName.trim()) {
      toast.error("File name is required.", toastErrorStyle);
      return;
    }

    if (!dataset) {
      toast.error("Please select a dataset.", toastErrorStyle);
      return;
    }

    // Cảnh báo không bắt buộc
    if (!description.trim()) {
      toast.warning("Description is recommended.", toastWarningStyle);
    }

    if (categories.length === 0) {
      toast.warning("Select at least one category.", toastWarningStyle);
    }

    // Nếu đã qua hết điều kiện, tiếp tục submit
    setLoading(true);
    try {
      const datasetId = dataset.split("_")[0];

      const data = {
        label: fileName,
        description,
        restrict,
        categories,
      };

      const tempUploadFile = await fileApi.uploadFile(
        apiToken,
        data,
        datasetId,
        file
      );

      if (tempUploadFile) {
        setLoading(false);
        toast.success("File upload successful", toastSuccessStyle);

        setTimeout(() => {
          const datasetUrl = `${dataverseHost}/file.xhtml?persistentId=${tempUploadFile.data.files[0].dataFile.persistentId}`;
          window.open(datasetUrl, "_blank"); // Mở tab mới
          window.location.reload(); // Reload lại trang hiện tại
        }, 2000);
        return;
      }
    } catch (err) {
      toast.error("Upload failed.");
    }

    setLoading(false);
    toast.error("file upload failed", toastErrorStyle);
  };

  // Style dùng chung cho toast lỗi
  const toastErrorStyle = {
    style: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      marginBottom: "50px",
      fontSize: "16px",
    },
  };

  const toastWarningStyle = {
    style: {
      backgroundColor: "#fef3c7", // vàng nhạt
      color: "#78350f", // nâu đậm hơn cho dễ đọc
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "50px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
  };

  const toastSuccessStyle = {
    icon: "🚀",
    style: {
      backgroundColor: "#d1fae5", // xanh lá nhạt
      color: "#065f46", // xanh lá đậm

      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "50px",
    },
  };

  return (
    <div className="w-full">
      {loading && <LoadingScreen />}
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="w-full ">
          <FileDropZone file={file} onFileSelected={setFile} />
        </div>

        <div className="w-full">
          {file && (
            <ul className="mt-4 text-left text-sm">
              <OneFilePreview file={file} onDelete={() => setFile(null)} />
            </ul>
          )}
        </div>

        <div className="w-full flex flex-col items-center mt-4 border border-[#ccc] rounded">
          <div className="w-[80%] py-4">
            <label
              className="w-full justify-between flex "
              htmlFor="input_api_token"
            >
              <span className="w-[20%]"> API Token *</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_api_token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
                <div className=" mt-2">
                  <a
                    href={`${dataverseHost}/dataverseuser.xhtml?selectTab=apiTokenTab`}
                    target="_blank"
                    className="text-hover-underline-blue mr-8"
                  >
                    Get API TOKEN
                  </a>
                </div>
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_file_name"
            >
              <span className="w-[20%]">File name *</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_file_name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </label>

            <label className="w-full justify-between flex mt-4">
              <span className="w-[20%]">Dataset *</span>
              <div className="flex flex-col w-[70%]">
                {!datasetForUploadFiles ? (
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer w-[30%]"
                    onClick={() => getDatasetForUploadFile(1)}
                  >
                    Get Datasets
                  </Button>
                ) : (
                  <Select onValueChange={(value) => setDataset(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {datasetForUploadFiles &&
                          datasetForUploadFiles.data.items.map(
                            (data, index) => (
                              <div key={index}>
                                <SelectItem
                                  value={data.global_id + "_" + data.versionId}
                                >
                                  <div className="flex justify-between flex-wrap gap-2 items-center w-full">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="mr-2"> {data.name}</span>
                                      {data.is_deaccesioned && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-gray-500 text-white rounded">
                                          Deaccessioned
                                        </span>
                                      )}
                                      {data.is_draft_state && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded">
                                          Draft
                                        </span>
                                      )}
                                      {data.is_in_review_state && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded">
                                          In Review
                                        </span>
                                      )}
                                      {data.is_published && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-green-600 text-white rounded">
                                          Published
                                        </span>
                                      )}
                                      {data.is_unpublished_state && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded">
                                          Unpublished
                                        </span>
                                      )}
                                      {data.is_valid && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-purple-500 text-white rounded">
                                          Valid
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[12px] text-gray-600 font-medium">
                                      {data.name_of_dataverse}
                                    </div>
                                  </div>
                                </SelectItem>
                              </div>
                            )
                          )}

                        {datasetForUploadFiles && (
                          <Pagination>
                            <PaginationContent>
                              {datasetForUploadFiles.data.pagination.pageNumberList.map(
                                (pageNumber) => (
                                  <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                      href="#"
                                      isActive={
                                        pageNumber ===
                                        datasetForUploadFiles.data.pagination
                                          .selectedPageNumber
                                      }
                                      className="mt-2 text-[12px]"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        getDatasetForUploadFile(pageNumber);
                                      }}
                                    >
                                      {pageNumber}
                                    </PaginationLink>
                                  </PaginationItem>
                                )
                              )}
                            </PaginationContent>
                          </Pagination>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_file_description"
            >
              <span className="w-[20%]">Description </span>
              <div className="flex flex-col w-[70%]">
                <Textarea
                  className=""
                  id="input_file_description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_file_restrict"
            >
              <span className="w-[20%]">Restrict</span>
              <div className="flex flex-col w-[70%]">
                <RadioGroup
                  defaultValue="false"
                  onValueChange={(value) => {
                    setRestrict(value);
                    console.log("Restrict:", value); // "true" hoặc "false"
                  }}
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="true"
                      id="input_restrict_true"
                      className="mr-2"
                    />
                    <Label htmlFor="input_restrict_true">True</Label>
                  </div>

                  <div className="flex items-center">
                    <RadioGroupItem
                      value="false"
                      id="input_restrict_false"
                      className="mr-2"
                    />
                    <Label htmlFor="input_restrict_false">False</Label>
                  </div>
                </RadioGroup>
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_file_categories"
            >
              <span className="w-[20%]">Categories</span>
              <div className="flex flex-col w-[70%]">
                {/* <div className="flex items-center">
                  <Checkbox id="input_categories" />
                  <Label htmlFor="input_categories">Plot level data</Label>
                </div> */}

                <CategoryCheckboxGroup
                  defaultSelected={["Plot level data"]}
                  onChange={(selected) => {
                    console.log("Selected categories:", selected);
                    setCategories(selected); // <- Gán vào state
                  }}
                />
              </div>
            </label>
          </div>
        </div>

        <Button type="submit" className="px-4 py-2 cursor-pointer mt-2">
          Upload File
        </Button>
      </form>
    </div>
  );
};

export default UploadFile;
