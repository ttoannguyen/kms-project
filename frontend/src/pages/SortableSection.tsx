// SortableSection.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
// import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
  isAdmin: boolean;
}

export const SortableSection = ({ id, title, children, isAdmin }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg bg-white shadow-sm mb-4 p-4"
    >
      <div className="flex items-center mb-2">
        {isAdmin && (
          <div {...attributes} {...listeners} className="cursor-grab mr-2">
            <GripVertical className="text-gray-500" />
          </div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
