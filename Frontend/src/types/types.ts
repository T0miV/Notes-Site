export type Note = {
    id: number;
    title: string;
    text: string;
    timestamp: string;
    color: string;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isDeleted?: number;
  };