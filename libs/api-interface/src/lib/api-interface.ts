import { Appointments, Patient, User } from '@prisma/client';

export type UserResponse = Omit<User, 'password'>;

export type UserProfileResponse = Patient & { appointments: Appointments[] };
