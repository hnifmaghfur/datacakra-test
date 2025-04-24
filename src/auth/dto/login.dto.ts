import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const loginDto = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
  })
  .required();

export type loginDtoType = z.infer<typeof loginDto>;

export const tLoginDto = extendApi(
  z
    .object({
      email: z.string().email(),
      password: z.string().min(4),
    })
    .required(),
  {
    title: 'Login user',
    description: 'user login schema',
  },
);

export class TLoginDto extends createZodDto(tLoginDto) {}
