import { useEffect, useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSection } from "./SortableSection";
import { useAuth } from "@/contexts/AuthProvider"; // ✅ fix here

const sectionComponents: Record<string, React.ReactNode> = {
  news: <div>Tin tức mới nhất tại đây</div>,
  siteUpdate: <div>Thông báo cập nhật hệ thống</div>,
  publicAnnouncements: <div>Thông báo công khai quan trọng</div>,
};

const sectionTitles: Record<string, string> = {
  news: "News",
  siteUpdate: "Site Update",
  publicAnnouncements: "Public Announcements",
};

const DEFAULT_ORDER = ["news", "siteUpdate", "publicAnnouncements"];

const SectionSkeleton = () => (
  <div className="h-24 bg-gray-100 animate-pulse rounded-lg mb-4" />
);

const HomePage = () => {
  const { isLoading, hasRole } = useAuth(); // ✅ dùng đúng context
  const [isAdmin, setIsAdmin] = useState(false);

  const [order, setOrder] = useState<string[]>(() => {
    const saved = localStorage.getItem("home_section_order");
    return saved ? JSON.parse(saved) : DEFAULT_ORDER;
  });

  useEffect(() => {
    if (!isLoading && hasRole("kms_admin")) {
      setIsAdmin(true);
    }
  }, [isLoading, hasRole]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id.toString());
    const newIndex = order.indexOf(over.id.toString());

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(order, oldIndex, newIndex);
    setOrder(newOrder);
    localStorage.setItem("home_section_order", JSON.stringify(newOrder));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
     <div className="min-h-1000px flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Maintenance Mode</h1>
      <p className="text-lg text-gray-600">The home page is under maintenance.</p>
    </div>
      {/* <h1 className="text-2xl font-bold mb-6">Trang chủ</h1> */}

      {/* {isLoading ? (
        order.map((key) => <SectionSkeleton key={key} />)
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            {order.map((key) => (
              <SortableSection
                key={key}
                id={key}
                title={sectionTitles[key]}
                isAdmin={isAdmin}
              >
                {sectionComponents[key]}
              </SortableSection>
            ))}
          </SortableContext>
        </DndContext>
      )} */}
    </div>
  );
};

export default HomePage;
