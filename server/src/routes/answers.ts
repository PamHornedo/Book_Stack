import { Router, Request, Response } from 'express';
import Answer from '../models/Answer';
import Question from '../models/Question';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: POST /api/questions/:questionId/answers - Create answer (protected)
router.post('/:questionId/answers', authenticate, async (req: Request, res: Response) => {
  // TODO: Get questionId from params
  // const { questionId } = req.params;

  // TODO: Get body from req.body
  // const { body } = req.body;

  // TODO: Validate body is provided

  // TODO: Check if question exists
  // const question = await Question.findByPk(questionId);
  // If not found, return 404 "Question not found"

  // TODO: Create answer
  // const answer = await Answer.create({
  //   body,
  //   questionId: Number(questionId),
  //   userId: req.user!.id
  // });

  // TODO: Fetch created answer with user info
  // Use findByPk with include

  // TODO: Return created answer
});

// TODO: PUT /api/answers/:id - Update answer (protected, owner only)
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  // TODO: Get id from params and body from req.body

  // TODO: Find answer
  // If not found, return 404

  // TODO: Check ownership
  // If not owner, return 403

  // TODO: Update answer
  // await answer.update({ body });

  // TODO: Return updated answer
});

// TODO: DELETE /api/answers/:id - Delete answer (protected, owner only)
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  // TODO: Find answer

  // TODO: Check ownership

  // TODO: Delete answer
  // await answer.destroy();

  // TODO: Return success message
});

export default router;
