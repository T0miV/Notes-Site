export interface Note {
    id: number;
    title: string;
    content: string;
    color: string; // Värivalitsin, jos käytät sitä.
    createdAt: Date;
    updatedAt: Date;
  }