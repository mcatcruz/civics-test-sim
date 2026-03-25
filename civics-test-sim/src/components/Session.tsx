import { useState } from 'react';
import { QUESTION_BANK } from '../../../src/hardcoded_data/QUESTION_BANK_2025';

import type { Question } from '../../../src/models/question';
import type { SessionConfig } from '../../../src/models/sessionConfig';

import { submitAnswer } from '../../../src/session/advanceSession';
import { getCurrentQuestion } from '../../../src/session/getCurrentQuestion';
import { createSession } from '../../../src/session/createSession';
import { Response } from './Response';

/**
 * Main quiz shell for the React UI.
 *
 * **State**
 * - `currentSession` — Domain session from `createSession(sessionConfig, QUESTION_BANK)`;
 *   initialized once via lazy `useState(() => …)`. Updates only through `submitAnswer`
 *   (immutable replacement), never mutated in place.
 * - `rawUserInput` — Draft answer string; lifted here so submit can pass it to `submitAnswer`.
 *
 * **Flow**
 * - Renders the current prompt from `getCurrentQuestion(currentSession)` and the controlled
 *   `Response` form.
 * - On submit, replaces session with `submitAnswer(prev, rawUserInput)` and clears the draft.
 * - Submit is disabled when there is no current question (`getCurrentQuestion` is `null`),
 *   e.g. session status is no longer `in_progress`.
 *
 * **Not yet in UI**
 * - Outcome summary and “new session” restart (`createSession` again) after pass/fail/complete.
 *
 * `sessionConfig` is module-level and static for this iteration.
 */

// TODO: Make future sessionConfigs dynamic
const sessionConfig: SessionConfig = {
    mode: 'mock',
    state:  'CA',
    max_questions: 20,
    pass_threshold: 12,
    fail_threshold: 9,
}

export function Session() {
    const [currentSession, setCurrentSession] = useState(() => createSession(sessionConfig, QUESTION_BANK));
    const [rawUserInput, setRawUserInput] = useState('');

    const currentQuestion: Question | null = getCurrentQuestion(currentSession)

    const handleChange = (rawString: string) => {
        setRawUserInput(rawString);
    };

    const handleSubmitAnswer = () => {
        setCurrentSession((prev) => submitAnswer(prev, rawUserInput));
        setRawUserInput("");
    };

    return (
        <>
            <h2>{currentQuestion?.question_text}</h2>
            <Response
                rawUserInput={rawUserInput}
                onChange={handleChange}
                onSubmit={handleSubmitAnswer}
                isSubmitDisabled={currentQuestion === null}
            />
        </>
    );
}
