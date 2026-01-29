import { createResponse } from '../grading/createResponse';
import { HARDCODED_QUESTIONS } from '../hardcoded_data/questions';
import { getCurrentQuestion } from '../session/getCurrentQuestion';
import { createSession } from '../session/createSession';
import { Session } from '../models/session';
import { SessionConfig } from '../models/sessionConfig';

// Validating Questions and Answers Alignment and Correctness
const testCorrectAnswer: string = "Thomas Jefferson";
const Q1 = HARDCODED_QUESTIONS[4]

const testIncorrectAnswer: string = "Dj Vance";
const Q2 = HARDCODED_QUESTIONS[5]

// console.log(Q1, testCorrectAnswer, createResponse(testCorrectAnswer, Q1));
// console.log(Q2, testIncorrectAnswer, createResponse(testIncorrectAnswer, Q2));

// Testing getCurrentQuestion Functionality 
const sessionConfig: SessionConfig = {
        mode: 'mock',
        state:  'CA',
        max_questions: 20,
        pass_threshold: 12,
        fail_threshold: 9,
    }
    
let currentSession: Session = createSession(sessionConfig);
    
console.log('Test 1: Normal case - index 0');
console.log('Result: ', getCurrentQuestion(currentSession));

currentSession = {
    ...currentSession,
    currentIndex: 1
}

console.log('\nTest 2: Normal case - index 1');
console.log('Result: ', getCurrentQuestion(currentSession));

// Test: status not 'in_progress' should return null

currentSession = {
    ...currentSession,
    status: 'failed'
}
console.log('\nTest 3: Status not in_progress');
console.log('Result:', getCurrentQuestion(currentSession));

// Test: index out of bounds should return null
currentSession = {
    ...currentSession,
    status: 'in_progress',
    currentIndex: 21
}

console.log('\nTest 4: Index out of bounds');
console.log('Result:', getCurrentQuestion(currentSession)); 
