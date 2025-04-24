import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const tApiResponse = extendApi(
  z.object({
    message: z.any(),
    data: extendApi(z.any(), {
      description: 'many responses depend on the content api',
    }),
    success: z.boolean(),
  }),
  {
    title: 'Response Data',
    description: 'All Success Response Data use this response',
  },
);

export class TApiResponse extends createZodDto(tApiResponse) {}
