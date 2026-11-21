export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}
