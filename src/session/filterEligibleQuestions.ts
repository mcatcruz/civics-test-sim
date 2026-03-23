// import { SessionConfig } from '../models/sessionConfig'; TODO - Implement filtering based on SessionConfig in Phase 2
import { Question } from '../models/question';

export function filterEligibleQuestions(questionBank: Question[]): Question[] {
    const eligibleQuestions = questionBank.filter(question => question.answer_type === 'static');

    return eligibleQuestions;
};