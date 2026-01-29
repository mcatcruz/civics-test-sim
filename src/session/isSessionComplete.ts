import { Session } from "../models/session";

/**
 * Pure helper function that checks if a session is complete.
 * Returns true if the session status is not 'in_progress' (i.e., 'passed', 'failed', or 'completed').
 * 
 * @param session - The current session state
 * @returns true if the session is complete, false if it's still in progress
 */
export function isSessionComplete(session: Session): boolean {
    return session.status !== 'in_progress';
}