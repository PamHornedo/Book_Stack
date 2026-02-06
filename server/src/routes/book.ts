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

//We can do this one that adds a search param to the standard route, or......
//router.get('/', async (req: Request, res: Response) => {
//  try {
//    const { title } = req.query;
//    
//    if (title) {
//      const books = await Book.findAll({
//        where: {
//          title: {
//            [Op.like]: `%${title}%` // Case-insensitive partial match
//          }
//        },
//        order: [['createdAt', 'DESC']],
//      });
//      return res.json(books);
//    }
//    
//    // Otherwise, return all books/
 //   const books = await Book.findAll({
//      order: [['createdAt', 'DESC']],
//    });
//    res.json(books);
//  }
//  catch (error) {
//    console.error('Error fetching books:', error);
//    res.status(500).json({message: 'error fetching books'});
//  }
//});

//if we wanted to have a designated search route then we can do this one instead. I am not sure
//for the configuration of our app which one would be better? 
// router.get('/search', async (req: Request, res: Response) => {
//   try {
//     const { title } = req.query;

//     if (!title || typeof title !== 'string') {
//       return res.status(400).json({ 
//         message: 'Please provide a title search parameter' 
//       });
//     }

//     const books = await Book.findAll({
//       where: {
//         title: {
//           [Op.iLike]: `%${title}%` // Case-insensitive partial match
//         }
//       },
//       order: [['createdAt', 'DESC']],
//     });

//     res.json(books);

//   } catch (error) {
//     console.error('Error searching books:', error);
//     res.status(500).json({ message: 'Error searching books' });
//   }
// });

export default router;