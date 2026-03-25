import { useState } from 'react';
import { QUESTION_BANK } from '../../../src/hardcoded_data/QUESTION_BANK_2025';

import type { Session } from '../../../src/models/session';
import type { Question } from '../../../src/models/question';
import type { SessionConfig } from '../../../src/models/sessionConfig';

import { submitAnswer } from '../../../src/session/advanceSession';
import { getCurrentQuestion } from '../../../src/session/getCurrentQuestion';
import { createSession } from '../../../src/session/createSession';
import { Response } from './Response';

/**
 * Main quiz shell for the React UI.
 *
 * Creates a session from the shared question bank and config, resolves the current
 * question via `getCurrentQuestion`, and renders the prompt plus the `Response` input.
 * Config is static for now; submit/advance flow will be wired to session logic next.
 * 
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
        />
        </>
    );
};