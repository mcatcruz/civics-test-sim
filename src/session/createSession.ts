import { SessionConfig } from "../models/sessionConfig";
import { Question } from "../models/question";
import { Session } from "../models/session";
import { filterEligibleQuestions } from "./filterEligibleQuestions";
import { selectRandomQuestions } from "./selectRandomQuestions";

/**
 * Creates a brand new session from scratch.
 * Initializes all counters to 0, sets up initial state, selects questions, and generates a new session ID.
 * 
 * @param sessionConfig - The configuration for the session
 * @param questions - Optional array of questions. If not provided, uses HARDCODED_QUESTIONS
 * @returns A new Session object with initial state
 */
export function createSession(sessionConfig: Readonly<SessionConfig>, questions: Question[]): Session {
    const cfg: SessionConfig = {
        ...sessionConfig,
        mode: "mock",
        state: "CA", // Default to "CA"
        max_questions: 20,
        pass_threshold: 12,
        fail_threshold: 9,
    };

    const now = Date.now();
    const now_str = now.toString();

    const eligibleQuestions = filterEligibleQuestions(questions);

    if (eligibleQuestions.length === 0) {
        throw new Error('No eligible questions available for this session (question bank is empty).')
    } 
    const randomQuestions = selectRandomQuestions(eligibleQuestions);

    const currentSession: Session = {
        id: now_str,
        config: cfg,
        selectedQuestions: randomQuestions,
        askedQuestionsCount: 0,
        correctAnswersCount: 0,
        incorrectAnswersCount: 0,
        currentIndex: 0,
        status: "in_progress" as const,
        responses: [],
    }
    return currentSession;
}