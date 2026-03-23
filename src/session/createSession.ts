import { SessionConfig } from "../models/sessionConfig";
import { Question } from "../models/question";
import { Session } from "../models/session";
import { filterEligibleQuestions } from "./filterEligibleQuestions";
import { selectRandomQuestions } from "./selectRandomQuestions";

/**
 * Creates a brand new session from scratch.
 * Filters the question bank to eligible questions, randomly selects up to 20, then initializes counters and state.
 *
 * @param sessionConfig - The configuration for the session (merged with defaults for mode, state, thresholds)
 * @param questions - Full question bank to draw from (filtered then shuffled via `filterEligibleQuestions` and `selectRandomQuestions`)
 * @returns A new Session object with `selectedQuestions` populated and all counters at zero
 * @throws If no eligible questions remain after filtering (empty bank or nothing matches Phase 1 rules)
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