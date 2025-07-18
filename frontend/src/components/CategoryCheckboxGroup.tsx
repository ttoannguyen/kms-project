import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CATEGORY_GROUPS = [
  {
    label: "Dữ liệu khảo sát",
    items: [
      "Plot level data",
      "Household survey data",
      "Community level data",
      "Farmer practice data",
    ],
  },
  {
    label: "Đo đạc & môi trường",
    items: [
      "Soil data",
      "Water quality data",
      "Weather & climate data",
      "Biodiversity data",
    ],
  },
  {
    label: "Tài liệu & công cụ",
    items: ["Survey forms", "Interview transcripts", "Data collection tools"],
  },
  {
    label: "Tổng hợp & phân tích",
    items: [
      "Statistical reports",
      "Data analysis results",
      "Summary documents",
    ],
  },
  {
    label: "GIS & không gian",
    items: ["GIS shapefiles", "Satellite imagery", "Geolocation data"],
  },
  {
    label: "Khác",
    items: ["Photos and media", "Policy documents", "Training materials"],
  },
];

export function CategoryCheckboxGroup({
  onChange,
  defaultSelected = [],
}: {
  onChange?: (selected: string[]) => void;
  defaultSelected?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const handleCheck = (item: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, item]
      : selected.filter((i) => i !== item);

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="grid gap-4">
      {CATEGORY_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-sm font-semibold mb-2">{group.label}</p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {group.items.map((item) => (
              <Label
                key={item}
                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 transition-all has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
              >
                <Checkbox
                  id={item}
                  checked={selected.includes(item)}
                  onCheckedChange={(checked) =>
                    handleCheck(item, checked === true)
                  }
                  className="mt-1 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <span className="text-sm">{item}</span>
              </Label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
