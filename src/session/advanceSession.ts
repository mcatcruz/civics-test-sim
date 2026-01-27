import { Session } from "../models/session";
import { createResponse } from "../grading/createResponse";

/**
 * Updates an existing session with a new answer.
 * Creates a response object, updates counters, determines status, and returns a new session object.
 * 
 * @param currentSession - The current session state
 * @param rawUserAnswer - The user's typed answer as a string
 * @returns A new Session object with updated counters, status, and response
 */
function submitAnswer(currentSession: Session, rawUserAnswer: string): Session {
    const questionIndex = currentSession.currentIndex;
    const response = createResponse(rawUserAnswer, currentSession.selectedQuestions[questionIndex]); 
    const pass_threshold = currentSession.config.pass_threshold;
    const max_questions = currentSession.config.max_questions;
    const fail_threshold = currentSession.config.fail_threshold;
    
    const updatedResponses = [...currentSession.responses, response];
    const asked = currentSession.askedQuestionsCount + 1;
    const correct = currentSession.correctAnswersCount + (response.isCorrect ?  1 : 0 );
    const incorrect = currentSession.incorrectAnswersCount + (response.isCorrect ? 0 : 1);

    let currentStatus = currentSession.status;

    if (currentStatus === 'in_progress') {
        return currentSession;
    }

    if ( correct  >= pass_threshold ) {
        currentStatus = 'passed';

    } else if ( incorrect >=  fail_threshold ) { 
        currentStatus = 'failed';

    } else if ( asked >= max_questions ) {
        currentStatus = 'completed';

    } else {
        currentStatus = 'in_progress';
    }

    const updatedIndex =  currentSession.currentIndex + (currentStatus === 'in_progress' ? 1 : 0 ); 

    const updatedSession: Session = { ...currentSession,
        askedQuestionsCount: asked,
        responses: updatedResponses,
        correctAnswersCount: correct,
        incorrectAnswersCount: incorrect,
        currentIndex: updatedIndex,
        status: currentStatus,
    }

    return updatedSession;
}
