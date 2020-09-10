export interface Question {
    id: string;
    type: string;
    category: string;
    text: string;
    maxScore: number;
    imagePath: string;
    creator: string;
}