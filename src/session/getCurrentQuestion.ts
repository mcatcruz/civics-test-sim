import { Session } from "../models/session";
import { Question } from "../models/question";

/**
 * Pure selector that returns the current Question or null.
 * Returns null if the session is not in progress or if the currentIndex is out of bounds.
 * 
 * @param session - The current session state
 * @returns The current Question object if available, or null if session is complete or index is out of bounds
 */
export function getCurrentQuestion(session: Session): Question | null {
    if (session.status !== 'in_progress') {
        return null;
    } else if (session.currentIndex < session.selectedQuestions.length){
        return session.selectedQuestions[session.currentIndex];
    } 
    return null;
}