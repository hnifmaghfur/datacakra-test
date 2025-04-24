import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const validTripDto = z
  .object({
    email: z.string().email(),
    destination: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    createdBy: z.string(),
  })
  .required();

export type ValidTripDto = z.infer<typeof validTripDto>;

export const reqTripDto = validTripDto.omit({ createdBy: true });

export const createTripDto = extendApi(reqTripDto, {
  title: 'Insert Trip',
  description: 'Insert trip only for Admin',
});

export class CreateTripDto extends createZodDto(createTripDto) {}

export const validUpdateTripDto = validTripDto.extend({
  id: z.number(),
});

export type ValidUpdateTripDto = z.infer<typeof validUpdateTripDto>;

export const updateTripDto = extendApi(validUpdateTripDto, {
  title: 'Update Trip Data',
  description: 'Update trip only for admin',
});

export class UpdateTripDTO extends createZodDto(updateTripDto) {}
