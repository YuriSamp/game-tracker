import { z } from 'zod';

export const signInForm = z.object({
  email: z.string().min(1, 'Email need at least 1 characters').email(),
  password: z.string().min(8, 'Passwords need 8  at least  characters'),
});

export const signUpForm = z
  .object({
    email: z.string().min(1, 'Email need at least 1 characters').email(),
    password: z.string().min(8, 'Passwords need at least 8 characters'),
    passwordConfirm: z
      .string()
      .min(8, 'Password Confirm need at least  8 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export type signUpFormType = z.infer<typeof signUpForm>;
export type signInFormType = z.infer<typeof signInForm>;
