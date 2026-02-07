import { Router, Request, Response } from "express";
import Book from "../models/Book";
import User from "../models/User";
import Review from "../models/Review";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /api/books - Get all books
router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
        { model: Review, as: 'reviews', attributes: ['id'], separate: true },
      ],
    });
    
    // Transform to include _count for frontend compatibility
    const booksWithCount = books.map(book => {
      const bookData: any = book.toJSON();
      return {
        ...bookData,
        _count: {
          reviews: bookData.reviews?.length || 0
        }
      };
    });
    
    res.json(booksWithCount);
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

    const book = await Book.findByPk(bookId, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
        { model: Review, as: 'reviews', include: [{ model: User, as: 'user', attributes: ['id', 'username'] }] },
      ],
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Error fetching book" });
  }
});

// POST /api/books - Create a book (protected)
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const { title, author, description } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof description !== "string" ||
      title.trim().length === 0 ||
      author.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      userId: req.user!.id,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Error creating book" });
  }
});

// PUT /api/books/:id - Update a book (protected, owner only)
router.put("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, author, description } = req.body;
    if (
      !title ||
      !author ||
      !description ||
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof description !== "string" ||
      title.trim().length === 0 ||
      author.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await book.update({ title, author, description });
    return res.json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Error updating book" });
  }
});

// DELETE /api/books/:id - Delete a book (protected, owner only)
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    if (Number.isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await book.destroy();
    return res.json({ message: "Book deleted" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Error deleting book" });
  }
});

export default router;