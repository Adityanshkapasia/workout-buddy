// Shared types for authentication
export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
}
