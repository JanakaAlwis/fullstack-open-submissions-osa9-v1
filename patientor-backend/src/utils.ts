import { z } from 'zod';
import { Gender, Patient } from './types/types';

export const GenderEnum = z.nativeEnum(Gender);

const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Invalid date format'
  }),
  ssn: z.string().min(1),
  gender: GenderEnum,
  occupation: z.string().min(1)
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export const toNewPatient = (object: unknown): Omit<Patient, 'id'> => {
  return NewPatientSchema.parse(object);
};
