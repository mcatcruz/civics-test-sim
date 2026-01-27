import { Session } from "../models/session";
import { createResponse } from "../grading/createResponse";
import { createSession } from "../session/createSession";

function submitAnswer(currentSession: Session, rawUserAnswer: string): Session {
    const questionIndex = currentSession.currentIndex;
    const response = createResponse(rawUserAnswer, currentSession.selectedQuestions[questionIndex]); 
    const pass_threshold = currentSession.config.pass_threshold;
    const max_questions = currentSession.config.max_questions;
    const fail_threshold = currentSession.config.fail_threshold;
    
    currentSession.responses.push(response);
    currentSession.askedQuestionsCount += 1
    
    if (response.isCorrect) {
        currentSession.correctAnswersCount += 1
    } else {
        currentSession.incorrectAnswersCount += 1
    }

    if ( currentSession.correctAnswersCount === pass_threshold ) {
        currentSession.status = 'passed';

        const newSession: Session =  createSession(currentSession.config);
        return newSession;

    } else if (  currentSession.incorrectAnswersCount ===  fail_threshold ) { 
        currentSession.status = 'failed';

        const newSession: Session =  createSession(currentSession.config);
        return newSession;

    } else if ( currentSession.askedQuestionsCount === max_questions ) {
        currentSession.status = 'completed';

        const newSession: Session =  createSession(currentSession.config);
        return newSession;

    } else {

        currentSession.status = 'in_progress';
        currentSession.currentIndex += 1;

        return currentSession;

    }
}
