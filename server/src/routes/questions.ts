import { Router, Request, Response } from 'express';
import Question from '../models/Question';
import Answer from '../models/Answer';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: GET /api/questions - Get all questions
router.get('/', async (req: Request, res: Response) => {
  // TODO: Fetch all questions with user info and answer count
  // const questions = await Question.findAll({
  //   include: [
  //     { model: User, as: 'user', attributes: ['id', 'username'] },
  //     { model: Answer, as: 'answers', attributes: [] }
  //   ],
  //   order: [['createdAt', 'DESC']],
  //   attributes: {
  //     include: [[fn('COUNT', col('answers.id')), '_count']]
  //   },
  //   group: ['Question.id', 'user.id'],
  //   subQuery: false
  // });

  // TODO: Return questions array
  // res.json(questions);
});

// TODO: GET /api/questions/:id - Get single question with answers
router.get('/:id', async (req: Request, res: Response) => {
  // TODO: Get id from params
  // const { id } = req.params;

  // TODO: Find question by id with User and Answers
  // Include Answer's User and Votes
  // const question = await Question.findByPk(id, {
  //   include: [
  //     { model: User, attributes: ['id', 'username'] },
  //     {
  //       model: Answer,
  //       include: [
  //         { model: User, attributes: ['id', 'username'] },
  //         { model: Vote }
  //       ]
  //     }
  //   ]
  // });

  // TODO: If not found, return 404 with message "Question not found"

  // TODO: Calculate vote counts for each answer
  // For each answer, sum up the vote values
  // Also include current user's vote if authenticated

  // TODO: Return question with answers
});

// TODO: POST /api/questions - Create new question (protected)
router.post('/', authenticate, async (req: Request, res: Response) => {
  // TODO: Get title and body from req.body

  // TODO: Validate input (both required)

  // TODO: Create question with userId from req.user
  // const question = await Question.create({
  //   title,
  //   body,
  //   userId: req.user!.id
  // });

  // TODO: Fetch created question with user info
  // Use findByPk with include

  // TODO: Return created question
});

// TODO: PUT /api/questions/:id - Update question (protected, owner only)
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  // TODO: Get id from params and title/body from body

  // TODO: Find question
  // If not found, return 404

  // TODO: Check if user owns this question
  // if (question.userId !== req.user!.id) return 403 "Not authorized"

  // TODO: Update question
  // await question.update({ title, body });

  // TODO: Return updated question
});

// TODO: DELETE /api/questions/:id - Delete question (protected, owner only)
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  // TODO: Find question

  // TODO: Check ownership

  // TODO: Delete question
  // await question.destroy();

  // TODO: Return success message
});

export default router;
