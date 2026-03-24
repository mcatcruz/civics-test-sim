import { QUESTION_BANK } from '../../../src/hardcoded_data/QUESTION_BANK_2025';

import type { Session } from '../../../src/models/session';
import type { Question } from '../../../src/models/question';
import type { SessionConfig } from '../../../src/models/sessionConfig';

import { getCurrentQuestion } from '../../../src/session/getCurrentQuestion';
import { createSession } from '../../../src/session/createSession';

import { Response } from './Response';

/**
 * Main quiz shell for the React UI.
 *
 * Creates a session from the shared question bank and config, resolves the current
 * question via `getCurrentQuestion`, and renders the prompt plus the `Response` input.
 * Config is static for now; submit/advance flow will be wired to session logic next.
 */
export function Session() {
    // TODO: Make future sessionConfigs dynamic
    const sessionConfig: SessionConfig = {
        mode: 'mock',
        state:  'CA',
        max_questions: 20,
        pass_threshold: 12,
        fail_threshold: 9,
    }
    const currentSession: Session = createSession(sessionConfig, QUESTION_BANK);
    const currentQuestion: Question | null = getCurrentQuestion(currentSession)

    return (
        
        <>
        <h2>{currentQuestion?.question_text}</h2>
        <Response/>
        </>
    );
};