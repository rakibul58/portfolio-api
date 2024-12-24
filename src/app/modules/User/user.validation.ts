import { z } from 'zod';

// Validation for signIn
const signinValidationSchema = z.object({
  body: z.object({
    user: z
      .string({ required_error: 'Username is required.' })
      .trim(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// refresh token cookie validation
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

// exporting the schema
export const UserValidations = {
  signinValidationSchema,
  refreshTokenValidationSchema,
};
