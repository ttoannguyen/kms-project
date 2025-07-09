
import { Post } from "../../models/Post";
import { AppDataSource } from "../../config/db/data-source";
import { PostRepository } from "../../repositories/PostRepository";

// const dataSource = new DataSource(Post);
const postRepository = new PostRepository(AppDataSource);

export const getPosts = async (): Promise<Post[]> => {
  return await postRepository.findAll();
};

export const createPost = async (
  title: string,
  content: string,
  userId: string
): Promise<Post> => {
  const postRepository = AppDataSource.getRepository(Post);

  const post = new Post();
  post.title = title;
  post.content = content;
  post.userId = userId;

  return await postRepository.save(post);
};


// export const fetchPostById = async (id: string) => {
//   const postRepository: Repository<Post> = getRepository(Post);
//   const post = await postRepository.findOne({ where: { id } });

//   if (!post) {
//     const error = new Error("Post not found");
//     (error as any).status = 404;
//     throw error;
//   }

//   return post;
// };

// export const createPost = async (
//   title: string,
//   content: string,
//   userId: string
// ) => {
//   if (!userId) {
//     const error = new Error("User ID is required");
//     (error as any).status = 401;
//     throw error;
//   }

//   const postRepository: Repository<Post> = getRepository(Post);
//   const post = new Post();
//   post.title = title;
//   post.content = content;
//   post.userId = userId;

//   return await postRepository.save(post);
// };

// export const updatePost = async (
//   id: string,
//   title: string,
//   content: string,
//   userId: string
// ) => {
//   const postRepository: Repository<Post> = getRepository(Post);
//   const post = await postRepository.findOne({ where: { id } });

//   if (!post) {
//     const error = new Error("Post not found");
//     (error as any).status = 404;
//     throw error;
//   }

//   if (post.userId !== userId) {
//     const error = new Error("Unauthorized: You can only edit your own posts");
//     (error as any).status = 403;
//     throw error;
//   }

//   post.title = title;
//   post.content = content;
//   return await postRepository.save(post);
// };

// export const deletePost = async (id: string, userId: string) => {
//   const postRepository: Repository<Post> = getRepository(Post);
//   const post = await postRepository.findOne({ where: { id } });

//   if (!post) {
//     const error = new Error("Post not found");
//     (error as any).status = 404;
//     throw error;
//   }

//   if (post.userId !== userId) {
//     const error = new Error("Unauthorized: You can only delete your own posts");
//     (error as any).status = 403;
//     throw error;
//   }

//   await postRepository.delete(id);
//   return { message: "Post deleted successfully" };
// };

// export const fetchPostCount = async () => {
//   const postRepository: Repository<Post> = getRepository(Post);
//   const count = await postRepository.count();
//   return { count };
// };
