import { SessionConfig } from './sessionConfig';
import { Question } from './question';

type Status = "in_progress" | "passed" | "failed" | "completed";

// Response = question + user input + grading outcome
interface Response {
    questionId: Question["id"];
    rawUserAnswer: string;
    normalizedUserAnswer: string;
    isCorrect: boolean;   
}

interface Session {
    id: number;
    config: SessionConfig;
    selectedQuestions: Question[];
    askedQuestionsCount: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    currentIndex: number;
    status: Status;
    responses: Response[];  
}
