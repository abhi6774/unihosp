import { $Enums } from '@prisma/client';

export type AccessTokenData = {
  id: string;
  email: string;
  role: $Enums.Role;
};
