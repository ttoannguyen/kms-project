import { Request, Response, NextFunction } from "express";
import * as postService from "../../services/post/post.service";
import { PostQueryParams } from "../../types/post";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    q = "*",
    sort = "createdAt",
    order = "desc",
    page = 1,
    per_page = 10,
  } = req.body as PostQueryParams;

  try {
    console.log(req.body);
    const data = await postService.fetchPosts({
      q,
      sort,
      order,
      page: parseInt(page as any, 10),
      per_page: parseInt(per_page as any, 10),
    });
    res.json(data);
  } catch (error: any) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await postService.fetchPostById(id);
    res.json(post);
  } catch (error: any) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, content } = req.body;
  const userId = req.user?.id; // Sử dụng req.user từ authMiddleware
  console.log(title, content);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  try {
    const post = await postService.createPost(title, content, userId);
    res.status(201).json(post);
  } catch (error: any) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  try {
    const post = await postService.updatePost(id, title, content, userId);
    res.json(post);
  } catch (error: any) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  try {
    const result = await postService.deletePost(id, userId);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
};

export const getPostCount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const counts = await postService.fetchPostCount();
    res.json(counts);
  } catch (error: any) {
    next(error);
  }
};
