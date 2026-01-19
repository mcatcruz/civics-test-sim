import { SessionConfig } from "../models/sessionConfig";
import { Question } from "../models/question";
import { Session } from "../models/session";

function createSession(sessionConfig: Readonly<SessionConfig>, questions: Question[]): Session {
    const cfg: SessionConfig = {
        ...sessionConfig,
        mode: "mock",
        state: "CA",
        max_questions: 20,
        pass_threshold: 12,
        fail_threshold: 9,
    };
    const currentSession: Session = {
        id: 0, //TODO: How to generate unique IDs?
        config: cfg,
        selectedQuestions: [...questions], // shallow copy to avoid mutation
        askedQuestionsCount: 0,
        correctAnswersCount: 0,
        incorrectAnswersCount: 0,
        currentIndex: 0,
        status: "in_progress" as const,
        responses: [],
    }
    return currentSession;
}