
import { QUESTION_BANK } from '../../../src/hardcoded_data/QUESTION_BANK_2025';

import type { Session } from '../../../src/models/session';
import type { Question } from '../../../src/models/question';
import type { SessionConfig } from '../../../src/models/sessionConfig';

import { getCurrentQuestion } from '../../../src/session/getCurrentQuestion';
import { createSession } from '../../../src/session/createSession';

import { Response } from './Response';


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