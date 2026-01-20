import { Response } from '../models/session';
import { Question } from '../models/question';

function normalize(rawText:string): string {
    const normalizedText = rawText.trim().replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    
    return normalizedText;
}

function isCorrectAnswer(normalizedUserInput: string, question: Question): boolean {
    const validAnswers = question.acceptable_answers_norm ?? question.acceptable_answers.map(normalize)

    return (validAnswers.includes(normalizedUserInput))
}

export function createResponse(userInput: string, question: Question) {
    const normalizedUserInput = normalize(userInput);

    const isNormalizedUserInputCorrect = isCorrectAnswer(normalizedUserInput, question);

    const currentResponse: Response = {
        questionId: question.id,
        rawUserAnswer: userInput,
        normalizedUserAnswer: normalizedUserInput,
        isCorrect: isNormalizedUserInputCorrect,
    }
    return currentResponse;
};