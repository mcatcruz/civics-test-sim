import { SessionConfig } from './sessionConfig';
import { Question } from './question';

type Status = "in_progress" | "passed" | "failed" | "completed";

interface Session {
    id: number;
    config: SessionConfig;
    selectedQuestions: Question[];
    askedQuestionsCount: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    currentIndex: number;
    status: Status;  
}
