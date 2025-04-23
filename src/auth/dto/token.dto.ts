import { z } from 'zod';

export const dataToken = z
  .object({
    id: z.number(),
    email: z.string().email(),
  })
  .required();

export type DataToken = z.infer<typeof dataToken>;
