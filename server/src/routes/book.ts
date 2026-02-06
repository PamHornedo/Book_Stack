import { Router, Request, Response} from 'express';
import Book from '../models/Book';
import Review from '../models/Review';
import User from '../models/User';
import { authenticate } from '../middleware/auth';
import { title } from 'node:process';

const router = Router();

//get api books - get all books
router.get('/', async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
        order: [['createdAt', 'DESC']],
    });
    res.json(books);
  }
  catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({message: 'error fetching books'});
  }
});

//get book by title
router.get('/', )

export default router;