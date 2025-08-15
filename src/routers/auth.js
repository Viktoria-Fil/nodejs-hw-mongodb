import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { confirmOAuthSchema, loginSchema, registerUserSchema, sendResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import {
  loginController,
  registerUserController,
  logoutController,
  refreshController,
  sendResetEmailController,
  resetPasswordController,
  getOAuthController,
  confirmOAuthController,
} from '../controllers/auth.js';

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRouter.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);
authRouter.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.get('/get-oauth-url', ctrlWrapper(getOAuthController));

authRouter.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(confirmOAuthSchema),
  ctrlWrapper(confirmOAuthController),
);

export default authRouter;