import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: POST /api/auth/register - Register a new user
router.post('/register', async (req: Request, res: Response) => {
  // TODO: Get username, email, password from req.body

  // TODO: Validate input (all fields required)
  // If missing fields, return 400 with message

  // TODO: Check if user already exists (by email or username)
  // Use User.findOne({ where: { ... } })
  // If exists, return 400 with message "User already exists"

  // TODO: Create the user
  // Remember: Password hashing happens in the model hook!
  // const user = await User.create({ username, email, password });

  // TODO: Generate JWT token
  // const token = jwt.sign(
  //   { id: user.id, email: user.email, username: user.username },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: '7d' }
  // );

  // TODO: Return token and user data (exclude password!)
  // res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// TODO: POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  // TODO: Get email and password from req.body

  // TODO: Find user by email
  // const user = await User.findOne({ where: { email } });
  // If not found, return 401 with message "Invalid credentials"

  // TODO: Compare password with bcrypt
  // const isValid = await bcrypt.compare(password, user.password);
  // If not valid, return 401 with message "Invalid credentials"

  // TODO: Generate JWT token (same as register)

  // TODO: Return token and user data
});

// TODO: GET /api/auth/profile - Get current user profile (protected route)
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  // TODO: Get user from database using req.user.id
  // const user = await User.findByPk(req.user!.id, {
  //   attributes: { exclude: ['password'] }
  // });

  // TODO: Return user data
  // res.json(user);
});

export default router;
