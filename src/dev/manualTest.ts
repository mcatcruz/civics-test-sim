import { createResponse } from '../grading/createResponse';
import { HARDCODED_QUESTIONS } from '../hardcoded_data/questions';
import { getCurrentQuestion } from '../session/getCurrentQuestion';
import { createSession } from '../session/createSession';
import { Session } from '../models/session';
import { SessionConfig } from '../models/sessionConfig';

const testCorrectAnswer: string = "Thomas Jefferson";
const Q1 = HARDCODED_QUESTIONS[4]

const testIncorrectAnswer: string = "Dj Vance";
const Q2 = HARDCODED_QUESTIONS[5]

console.log(Q1, testCorrectAnswer, createResponse(testCorrectAnswer, Q1));
console.log(Q2, testIncorrectAnswer, createResponse(testIncorrectAnswer, Q2));

const sessionConfig: SessionConfig = {
        mode: 'mock',
        state:  'CA',
        max_questions: 20,
        pass_threshold: 12,
        fail_threshold: 9,
    }

const currentSession: Session = createSession(sessionConfig)
    
console.log(currentSession)
console.log(getCurrentQuestion(currentSession));