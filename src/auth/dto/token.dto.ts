import { z } from 'zod';

export const dataToken = z
  .object({
    id: z.number(),
    email: z.string().email(),
    role: z.union([z.literal('admin'), z.literal('tenant')]),
  })
  .required();

export type DataToken = z.infer<typeof dataToken>;
