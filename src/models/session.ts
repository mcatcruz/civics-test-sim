import { SessionConfig } from './sessionConfig';
import { Question } from './question';

type Status = "in_progress" | "passed" | "failed" | "completed";

// Response = question + user input + grading outcome
export interface Response {
    questionId: Question["id"];
    rawUserAnswer: string;
    normalizedUserAnswer: string;
    isCorrect: boolean;   
}

export interface Session {
    id: string; // TODO: Change string to dynamic unique ID type later
    config: SessionConfig;
    selectedQuestions: Question[];
    askedQuestionsCount: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    currentIndex: number;
    status: Status;
    responses: Response[];  
}
