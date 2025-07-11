export type HomeSectionKey =
  | "news"
  | "siteUpdate"
  | "publicAnnouncements"
  | "posts"
  | "slide"
  | "topics";

export interface HomeSectionSettings {
  postIds?: string[];     // danh sách bài post cụ thể
  limit?: number;         // số lượng hiển thị
  filterTag?: string;     // ví dụ: "climate", "gender"
  showImages?: boolean;   // cấu hình giao diện
  [key: string]: any;     // mở rộng thêm cấu hình khác nếu cần
}

export interface HomeSectionConfigDTO {
  id: string;
  sectionKey: HomeSectionKey;
  title: string;
  visible: boolean;
  order: number;
  settings: HomeSectionSettings;
  createdAt: string;
}


export interface CreateHomeSectionConfigRequest {
  sectionKey: HomeSectionKey;
  title: string;
  visible?: boolean;
  order?: number;
  settings?: HomeSectionSettings;
}
