import { Question } from "../models/question";

/**
 * Shuffles eligible questions and returns up to 20 for a standard civics session.
 * Uses an in-place Fisher–Yates shuffle on a working copy of the array.
 *
 * @param eligibleQuestions - Questions already filtered as eligible (e.g. from `filterEligibleQuestions`)
 * @returns A new array containing at most the first 20 questions after shuffling (fewer if the pool is smaller)
 */
export function selectRandomQuestions(eligibleQuestions: Question[]): Question[] {
    const eligibleQuestionsCopy = [...eligibleQuestions];
            
    const shuffledEligibleQuestions = shuffle(eligibleQuestionsCopy);

    return shuffledEligibleQuestions.slice(0, 20);
};

/**
 * Fisher–Yates shuffle. Mutates the given array in place and returns it.
 */
function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex: number;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element using array destructuring.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
};  