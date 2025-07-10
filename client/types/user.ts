import z from 'zod';

export const User = z.object({
  id: z.string(),
  email: z.string(),
});

export const CurrentUserResponse = z.object({
  currentUser: User.optional(),
});

export type User = z.infer<typeof User>;
