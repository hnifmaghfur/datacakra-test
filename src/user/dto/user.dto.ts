import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createUserDto = z
  .object({
    email: z.string().email(),
    name: z.string(),
    role: z.union([z.literal('admin'), z.literal('tenant')]),
  })
  .required();

export const tcreateUserDto = extendApi(
  z
    .object({
      email: z.string().email(),
      name: z.string(),
      role: z.union([z.literal('admin'), z.literal('tenant')]),
    })
    .required(),
  { title: 'Insert user', description: 'input user dto' },
);

export type CreateUserDto = z.infer<typeof createUserDto>;

export class TCreateUserDto extends createZodDto(tcreateUserDto) {}

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
