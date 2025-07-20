import { CategoryCheckboxGroup } from "@/components/CategoryCheckboxGroup";
import FileDropZone from "@/components/FileDropZone";
import FilePreview from "@/components/FilePreview";
import SubjectTagInput from "@/components/SubjectTagInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LocationSelector from "@/components/LocationSelector";
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

const UploadFile = () => {
  // const baseURL = import.meta.env.VITE_API_BASE_URL;

  const baseURL = "https://demo.dataverse.org";
  // const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [restrict, setRestrict] = useState<string>("false");
  const [categories, setCategories] = useState<string[]>([]);

  const [apiToken, setApiToken] = useState<string>("");
  const [dataset, setDataset] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [datasetForUploadFiles, setDatasetForUploadFiles] = useState<any>(null);
  const [author, setAuthor] = useState<string>("");
  const [producer, setProducer] = useState<string>("");
  const [technical, setTechnical] = useState<string>("");

  const languageOptions = [
    { code: "vi", name: "Vietnamese (vi)" },
    { code: "en", name: "English (en)" },
  ];

  const stakeholderOptions = [
    { label: "Nhà nghiên cứu", value: "researcher" },
    { label: "Cán bộ nông nghiệp", value: "agriculture_officer" },
    { label: "Nông dân", value: "farmer" },
    { label: "Nhà hoạch định chính sách", value: "policy_maker" },
    { label: "Sinh viên", value: "student" },
    { label: "Khác", value: "other" },
  ];

  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>(
    []
  );

  const toggleCheckbox = (value: string) => {
    setSelectedStakeholders((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const [language, setLanguage] = useState<string>("");

  // const handleFileDelete = (fileToDelete: File) => {
  //   const updateFile = files.filter((file) => file !== fileToDelete);

  //   setFiles(updateFile);
  // };

  const getDatasetForUploadFile = async (pageNumber: number): Promise<void> => {
    if (apiToken !== "") {
      try {
        const tempDataset = await datasetApi.getDatasetForUploadFile(
          apiToken,
          pageNumber
        );

        console.log(tempDataset);
        if (tempDataset) {
          setDatasetForUploadFiles(tempDataset);
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
    } else {
      toast.error("Please enter API TOKEN", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          marginBottom: "50px",
          fontSize: "16px",
        },
      });
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

    if (!date) {
      toast.error("Please select a Date Collected.", toastErrorStyle);
      return;
    }
    if (!author.trim()) {
      toast.error("Author/Creator is required.", toastErrorStyle);
      return;
    }

    if (!language?.trim()) {
      toast.error("Please select a language.", toastErrorStyle);
      return;
    }

    // Cảnh báo không bắt buộc
    if (!description.trim()) {
      toast.warning("Description is recommended.", toastWarningStyle);
    }

    if (!date) {
      toast.warning("Date Collected is recommended.", toastWarningStyle);
    }

    if (!selectedLocation) {
      toast.warning("Location is recommended.", toastWarningStyle);
    }

    if (subjects.length === 0) {
      toast.warning("Add at least one subject.", toastWarningStyle);
    }

    if (categories.length === 0) {
      toast.warning("Select at least one category.", toastWarningStyle);
    }

    // Nếu đã qua hết điều kiện, tiếp tục submit
    try {
      // TODO: Gửi file và metadata đến backend ở đây
      toast.success("Submitting...");
      // await yourUploadFunction();
    } catch (err) {
      toast.error("Upload failed.");
    }
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

  return (
    <div className="w-full ">
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
                    href={`${baseURL}/dataverseuser.xhtml?selectTab=apiTokenTab`}
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
                        {datasetForUploadFiles.data.items.map((data) => (
                          <div key={data.entity_id}>
                            <SelectItem value="apple">
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
                        ))}

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

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_subject"
            >
              <span className="w-[20%]">Subjects</span>
              <div className="flex flex-col w-[70%]">
                <SubjectTagInput value={subjects} onChange={setSubjects} />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_date"
            >
              <span className="w-[20%]">Date Collected *</span>
              <div className="flex flex-col w-[70%]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "yyyy-MM-dd") : "Chọn ngày khảo sát"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    id="input_date"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </label>

            <label className="w-full justify-between flex mt-4">
              <span className="w-[20%]">Geographic Coverage</span>
              <div className="flex flex-col w-[70%]">
                <LocationSelector
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_producer"
            >
              <span className="w-[20%]">Producer / Contributor</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_producer"
                  value={producer}
                  onChange={(e) => setProducer(e.target.value)}
                />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_author"
            >
              <span className="w-[20%]"> Author / Creator *</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_language"
            >
              <span className="w-[20%]">Language *</span>
              <div className="flex flex-col w-[70%]">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_technicalNotes"
            >
              <span className="w-[20%]">Technical Notes / Methodology</span>
              <div className="flex flex-col w-[70%]">
                <Textarea
                  id="input_technicalNotes"
                  placeholder="Ví dụ: Dữ liệu thu thập bằng drone, xử lý bằng QGIS, lọc nhiễu bằng thuật toán XYZ..."
                  value={technical}
                  onChange={(e) => setTechnical(e.target.value)}
                />
              </div>
            </label>

            <label
              className="w-full justify-between flex mt-4"
              htmlFor="input_stakeholder"
            >
              <span className="w-[20%]">Stakeholder *</span>
              <div className="flex flex-col w-[70%]">
                {stakeholderOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-2 pb-2"
                  >
                    <Checkbox
                      id={opt.value}
                      checked={selectedStakeholders.includes(opt.value)}
                      onCheckedChange={() => toggleCheckbox(opt.value)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={opt.value}>{opt.label}</Label>
                  </div>
                ))}
              </div>
            </label>
          </div>
        </div>

        <Button type="submit" className="px-4 py-2 cursor-pointer">
          Upload File
        </Button>
      </form>
    </div>
  );
};

export default UploadFile;
