import { Question } from "../models/question";

export function selectRandomQuestions(eligibleQuestions: Question[]): Question[] {
    const eligibleQuestionsCopy = eligibleQuestions;
            
    const shuffledEligibleQuestions = shuffle(eligibleQuestionsCopy);

    return shuffledEligibleQuestions.slice(0, 20);
};

// Fisher Yates Shuffling Algorithm
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