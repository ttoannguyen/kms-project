// routes/admin.routes.ts
import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
  const user = req.user!;
  if (!user.roles?.includes("admin")) {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }

  res.json({
    message: "Chào mừng admin",
    user: req.user,
  });
});

export default router;
