// import { SessionConfig } from '../models/sessionConfig'; TODO - Implement filtering based on SessionConfig in Phase 2
import { Question } from '../models/question';

/**
 * Returns questions from the bank that are eligible for the current Phase 1 flow.
 * Today this filters to `answer_type === 'static'` only (excludes dynamic_official and state_specific).
 * SessionConfig-based filtering is planned for Phase 2.
 *
 * @param questionBank - Full list of questions (e.g. from the 2025 question bank)
 * @returns A new array of eligible questions (does not mutate the input)
 */
export function filterEligibleQuestions(questionBank: Question[]): Question[] {
    const eligibleQuestions = questionBank.filter(question => question.answer_type === 'static');

    return eligibleQuestions;
};