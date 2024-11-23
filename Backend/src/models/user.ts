export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // Hashed password tietoturvan vuoksi
    createdAt: Date;
    updatedAt: Date;
  }
  