import { z } from 'zod';

export const createUserDto = z
  .object({
    email: z.string().email(),
    name: z.string(),
    role: z.union([z.literal('admin'), z.literal('tenant')]),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateUserDto = createUserDto.extend({
  id: z.number(),
});

export type UpdateUserDto = z.infer<typeof updateUserDto>;

export const insertUserDto = createUserDto.extend({
  password: z.string(),
});

export type InsertUserDto = z.infer<typeof insertUserDto>;

export type UserShowData = {
  id: number;
  email: string;
  name: string;
};
