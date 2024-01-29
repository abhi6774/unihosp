import {} from '@unihosp/utils';
import { User } from '@prisma/client';

export type UserResponse = Omit<User, 'password'>;
