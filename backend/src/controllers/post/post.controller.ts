import { Request, Response, NextFunction } from "express";
import * as postService from "../../services/post/post.service";

// GET /posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  try {
    const post = await postService.createPost(title, content, userId);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};


// GET /posts/:id
// export const getPostById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const post = await postService.fetchPostById(id);
//     res.json(post);
//   } catch (error) {
//     next(error);
//   }
// };

// // POST /posts
// export const createPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { title, content } = req.body;
//   const userId = req.user?.id;

//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized: User not authenticated" });
//     return;
//   }

//   if (!title || !content) {
//     res.status(400).json({ error: "Title and content are required" });
//     return;
//   }

//   try {
//     const post = await postService.createPost(title, content, userId);
//     res.status(201).json(post);
//   } catch (error) {
//     next(error);
//   }
// };

// // PUT /posts/:id
// export const updatePost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   const userId = req.user?.id;

//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized: User not authenticated" });
//     return;
//   }

//   try {
//     const post = await postService.updatePost(id, title, content, userId);
//     res.json(post);
//   } catch (error) {
//     next(error);
//   }
// };

// // DELETE /posts/:id
// export const deletePost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { id } = req.params;
//   const userId = req.user?.id;

//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized: User not authenticated" });
//     return;
//   }

//   try {
//     const result = await postService.deletePost(id, userId);
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// // GET /posts/count
// export const getPostCount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const counts = await postService.fetchPostCount();
//     res.json(counts);
//   } catch (error) {
//     next(error);
//   }
// };
