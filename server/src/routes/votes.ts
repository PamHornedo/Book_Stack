import { Router, Request, Response } from 'express';
import Vote from '../models/Vote';
import Answer from '../models/Answer';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: POST /api/answers/:answerId/vote - Cast or update vote (protected)
router.post('/:answerId/vote', authenticate, async (req: Request, res: Response) => {
  // TODO: Get answerId from params
  // const { answerId } = req.params;

  // TODO: Get value from req.body (should be 1 or -1)
  // const { value } = req.body;

  // TODO: Validate value is 1 or -1
  // if (value !== 1 && value !== -1) return 400 "Invalid vote value"

  // TODO: Check if answer exists
  // const answer = await Answer.findByPk(answerId);
  // If not found, return 404

  // TODO: Check if user already voted on this answer
  // const existingVote = await Vote.findOne({
  //   where: { answerId, userId: req.user!.id }
  // });

  // TODO: If vote exists, update it
  // if (existingVote) {
  //   await existingVote.update({ value });
  //   return res.json({ message: 'Vote updated' });
  // }

  // TODO: Otherwise, create new vote
  // await Vote.create({
  //   value,
  //   answerId: Number(answerId),
  //   userId: req.user!.id
  // });

  // TODO: Return success message
});

// TODO: DELETE /api/answers/:answerId/vote - Remove vote (protected)
router.delete('/:answerId/vote', authenticate, async (req: Request, res: Response) => {
  // TODO: Get answerId from params

  // TODO: Find user's vote on this answer
  // const vote = await Vote.findOne({
  //   where: { answerId, userId: req.user!.id }
  // });

  // TODO: If no vote found, return 404 "No vote found"

  // TODO: Delete the vote
  // await vote.destroy();

  // TODO: Return success message
});

export default router;
