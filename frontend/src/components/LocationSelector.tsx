import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, ChevronsUpDown } from "lucide-react";

const predefinedLocations = [
  "Đồng Tháp",
  "Trà Vinh",
  "Cần Thơ",
  "An Giang",
  "Vĩnh Long",
  "Hậu Giang",
];

export default function LocationSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>(predefinedLocations);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(input.toLowerCase())
  );

  const handleAdd = (option: string) => {
    if (!options.includes(option)) {
      setOptions([...options, option]);
    }
    onChange(option);
    setOpen(false);
    setInput("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value ? value : "Chọn tỉnh/khu vực..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Tìm hoặc thêm..."
            value={input}
            onValueChange={setInput}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>
                <Button
                  variant="ghost"
                  onClick={() => handleAdd(input)}
                  className="w-full justify-start"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo mới: <strong className="ml-1">{input}</strong>
                </Button>
              </CommandEmpty>
            ) : (
              filteredOptions.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => handleAdd(option)}
                  className="cursor-pointer"
                >
                  {option}
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
