import  { Router } from "express";
import * as postController from "../../controllers/post/post.controller";
import { authMiddleware } from "../../middleware/authJwt";

const router = Router();

router.get("/", postController.getPosts);
// router.get("/:id", postController.getPostById);
// router.get("/count", postController.getPostCount);
router.post("/", authMiddleware, postController.createPost);
// router.put("/:id", authMiddleware, postController.updatePost);
// router.delete("/:id", authMiddleware, postController.deletePost);
export default router;
