import { Router, Request, Response } from "express";
import Book from "../models/Book";

const router = Router();

// GET /api/books - Get all books
router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// GET /api/books/:id - Get a single book
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Error fetching book" });
  }
});

export default router;