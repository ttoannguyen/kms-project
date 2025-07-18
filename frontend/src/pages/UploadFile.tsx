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
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import LocationSelector from "@/components/LocationSelector";

const UploadFile = () => {
  // const baseURL = import.meta.env.VITE_API_BASE_URL;

  const baseURL = "https://demo.dataverse.org";
  const [files, setFiles] = useState<File[]>([]);

  const [apiToken, setApiToken] = useState<string>("");
  const [dataset, setDataset] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleFileDelete = (fileToDelete: File) => {
    const updateFile = files.filter((file) => file !== fileToDelete);

    setFiles(updateFile);
  };

  return (
    <div className="w-full ">
      <form action="flex flex-col items-center">
        <div className="w-full ">
          <FileDropZone files={files} onFilesSelected={setFiles} />
        </div>

        <div className="w-full">
          {files.length > 0 && (
            <ul className="mt-4 text-left text-sm">
              {files.map((file, i) => (
                <FilePreview
                  key={i}
                  file={file}
                  index={i}
                  onDelete={handleFileDelete}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="w-full flex flex-col items-center mt-4 border border-[#ccc] rounded">
          <div className="w-[50%] py-4">
            <label className="w-full flex " htmlFor="input_api_token">
              <span className="w-[20%]"> API Token</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_api_token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
                <a
                  href={`${baseURL}/dataverseuser.xhtml?selectTab=apiTokenTab`}
                  target="_blank"
                  className="text-hover-underline-blue mt-2"
                >
                  Get API TOKEN
                </a>
              </div>
            </label>

            <label className="w-full flex mt-4" htmlFor="input_file_name">
              <span className="w-[20%]">File name</span>
              <div className="flex flex-col w-[70%]">
                <Input
                  type="text"
                  className=""
                  id="input_file_name"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
            </label>

            <label className="w-full flex mt-4">
              <span className="w-[20%]">Dataset</span>
              <div className="flex flex-col w-[70%]">
                <Select onValueChange={(value) => setDataset(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </label>

            <label
              className="w-full flex mt-4"
              htmlFor="input_file_description"
            >
              <span className="w-[20%]">Description</span>
              <div className="flex flex-col w-[70%]">
                <Textarea
                  className=""
                  id="input_file_description"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
            </label>

            <label
              className="w-full flex mt-4"
              htmlFor="input_file_description"
            >
              <span className="w-[20%]">Restrict</span>
              <div className="flex flex-col w-[70%]">
                <RadioGroup defaultValue="false">
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
              className="w-full flex mt-4"
              htmlFor="input_file_description"
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
                    // setCategories(selected) // nếu bạn dùng useState
                  }}
                />
              </div>
            </label>

            <label className="w-full flex mt-4" htmlFor="input_subject">
              <span className="w-[20%]">Subjects</span>
              <div className="flex flex-col w-[70%]">
                <SubjectTagInput value={subjects} onChange={setSubjects} />
              </div>
            </label>

            <label className="w-full flex mt-4" htmlFor="input_date">
              <span className="w-[20%]">Date Collected</span>
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

            <label className="w-full flex mt-4">
              <span className="w-[20%]">Geographic Coverage</span>
              <div className="flex flex-col w-[70%]">
                <LocationSelector
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;
