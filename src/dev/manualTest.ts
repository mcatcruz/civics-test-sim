import { createResponse } from '../grading/createResponse';
import { HARDCODED_QUESTIONS } from '../hardcoded_data/questions';

const testCorrectAnswer: string = "Thomas Jefferson";
const Q1 = HARDCODED_QUESTIONS[4]

const testIncorrectAnswer: string = "Dj Vance";
const Q2 = HARDCODED_QUESTIONS[5]

console.log(Q1, testCorrectAnswer, createResponse(testCorrectAnswer, Q1));
console.log(Q2, testIncorrectAnswer, createResponse(testIncorrectAnswer, Q2));