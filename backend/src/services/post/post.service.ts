import { Repository } from "typeorm";
import { getRepository } from "typeorm";
import { Post } from "../../models/Post";
import { PostQueryParams } from "../../types/post";

export const fetchPosts = async ({
  q = "*",
  sort = "createdAt",
  order = "desc",
  page = 1,
  per_page = 10,
}: PostQueryParams) => {
  const postRepository: Repository<Post> = getRepository(Post);
  const queryBuilder = postRepository.createQueryBuilder("post");

  // Tìm kiếm theo tiêu đề hoặc nội dung
  if (q && q !== "*") {
    queryBuilder.where("post.title ILIKE :q OR post.content ILIKE :q", {
      q: `%${q}%`,
    });
  }

  // Sắp xếp
  queryBuilder.orderBy(`post.${sort}`, order.toUpperCase() as "ASC" | "DESC");

  // Phân trang
  queryBuilder.skip((page - 1) * per_page).take(per_page);

  const [posts, total] = await queryBuilder.getManyAndCount();

  return {
    posts,
    total,
    page,
    per_page,
    total_pages: Math.ceil(total / per_page),
  };
};

export const fetchPostById = async (id: string) => {
  const postRepository: Repository<Post> = getRepository(Post);
  const post = await postRepository.findOne({ where: { id } });

  if (!post) {
    const error = new Error("Post not found");
    (error as any).status = 404;
    throw error;
  }

  return post;
};

export const createPost = async (
  title: string,
  content: string,
  userId: string
) => {
  if (!userId) {
    const error = new Error("User ID is required");
    (error as any).status = 401;
    throw error;
  }

  const postRepository: Repository<Post> = getRepository(Post);
  const post = new Post();
  post.title = title;
  post.content = content;
  post.userId = userId;

  return await postRepository.save(post);
};

export const updatePost = async (
  id: string,
  title: string,
  content: string,
  userId: string
) => {
  const postRepository: Repository<Post> = getRepository(Post);
  const post = await postRepository.findOne({ where: { id } });

  if (!post) {
    const error = new Error("Post not found");
    (error as any).status = 404;
    throw error;
  }

  if (post.userId !== userId) {
    const error = new Error("Unauthorized: You can only edit your own posts");
    (error as any).status = 403;
    throw error;
  }

  post.title = title;
  post.content = content;
  return await postRepository.save(post);
};

export const deletePost = async (id: string, userId: string) => {
  const postRepository: Repository<Post> = getRepository(Post);
  const post = await postRepository.findOne({ where: { id } });

  if (!post) {
    const error = new Error("Post not found");
    (error as any).status = 404;
    throw error;
  }

  if (post.userId !== userId) {
    const error = new Error("Unauthorized: You can only delete your own posts");
    (error as any).status = 403;
    throw error;
  }

  await postRepository.delete(id);
  return { message: "Post deleted successfully" };
};

export const fetchPostCount = async () => {
  const postRepository: Repository<Post> = getRepository(Post);
  const count = await postRepository.count();
  return { count };
};
