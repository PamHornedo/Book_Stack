import { Router, Request, Response } from "express";
import User from "../models/User";
import Book from "../models/Book";
import Review from "../models/Review";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /api/users - Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
});

// GET /api/users/stats - Get current user's stats (protected)
router.get("/stats", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    
    const booksCount = await Book.count({ where: { userId } });
    const reviewsCount = await Review.count({ where: { userId } });
    
    return res.json({
      books: booksCount,
      reviews: reviewsCount,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({ message: "Error fetching user stats" });
  }
});

// GET /api/users/:id - Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Error fetching user" });
  }
});

export default router;
