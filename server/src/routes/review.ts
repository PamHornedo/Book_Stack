import { Router, Request, Response } from "express";
import Review from "../models/Review";
import Book from "../models/Book";
import { authenticate } from "../middleware/auth";

const router = Router();

// POST /api/books/:bookId/reviews - Create review (protected)
router.post(
  "/books/:bookId/reviews",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const bookId = Number(req.params.bookId);
      const { body } = req.body;

      if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
      }

      if (!body || typeof body !== "string") {
        return res.status(400).json({ message: "Body is required" });
      }

      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      const review = await Review.create({
        body,
        bookId,
        userId: req.user!.id,
      });

      return res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(500).json({ message: "Error creating review" });
    }
  },
);

// PUT /api/reviews/:id - Update review (protected, owner only)
router.put("/reviews/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const reviewId = Number(req.params.id);
    const { body } = req.body;

    if (Number.isNaN(reviewId)) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    if (!body || typeof body !== "string") {
      return res.status(400).json({ message: "Body is required" });
    }

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await review.update({ body });
    return res.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ message: "Error updating review" });
  }
});

// DELETE /api/reviews/:id - Delete review (protected, owner only)
router.delete(
  "/reviews/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const reviewId = Number(req.params.id);

      if (Number.isNaN(reviewId)) {
        return res.status(400).json({ message: "Invalid review id" });
      }

      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      if (review.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await review.destroy();
      return res.json({ message: "Review deleted" });
    } catch (error) {
      console.error("Error deleting review:", error);
      return res.status(500).json({ message: "Error deleting review" });
    }
  },
);

export default router;
