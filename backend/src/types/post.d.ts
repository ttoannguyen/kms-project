export interface PostQueryParams {
  q?: string; // Từ khóa tìm kiếm
  sort?: string; // Trường sắp xếp (ví dụ: "createdAt")
  order?: "asc" | "desc"; // Thứ tự sắp xếp
  page?: number; // Trang hiện tại
  per_page?: number; // Số bài đăng mỗi trang
}
