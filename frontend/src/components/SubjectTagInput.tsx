import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function SubjectTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const predefinedSubjects: string[] = [
    "climate",
    "soil",
    "crop yield",
    "farmer behavior",
    "irrigation",
    "fertilizer",
  ];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>(predefinedSubjects);

  const handleAdd = (item: string) => {
    if (!value.includes(item)) {
      onChange([...value, item]);
    }
    setInput("");
    setOpen(false);
  };

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item));
    console.log(value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Chủ đề (Thematic Tags)
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Thêm chủ đề...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-[300px]">
          <Command>
            <CommandInput
              placeholder="Nhập hoặc chọn..."
              value={input}
              onValueChange={setInput}
            />
            <CommandList>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => handleAdd(option)}
                  className="cursor-pointer"
                >
                  {option}
                </CommandItem>
              ))}

              {input.trim() !== "" && !value.includes(input) && (
                <CommandItem
                  onSelect={() => handleAdd(input)}
                  className="cursor-pointer text-muted-foreground italic"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo mới: <strong className="ml-1">{input}</strong>
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 mt-2 ">
        {value.length > 0 &&
          value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1 px-4 py-2"
            >
              {tag}
              <button
                onClick={() => handleRemove(tag)}
                className="hover:text-red-500 p-0 m-0"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
      </div>
    </div>
  );
}
