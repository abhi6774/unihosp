import { Patient, User } from "src/app/interfaces";

export interface LoginResponse {
  message: string,
  data: {
    user: User
  }
}
