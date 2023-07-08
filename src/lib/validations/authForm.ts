import { z } from 'zod';

export const signInForm = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export const signUpForm = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
});
