# “USCIS Civics Mock Interview (MVP)”

Upon project completion, the USCIS Civics Mock Interview (MVP) will be able to ask up to 20 questions from the USCIS official questions, receive and grade typed answers, and show user their results.

Phase 1 will be text-based and have seamless quiz flow and grading logic. Phase 1 will not have a separate flow for users 65+ nor will it have state-specific questions. Furthermore, Phase 1 will not have TTS functionality.

## Frontend (React + Vite)

The web UI lives in the **`civics-test-sim/`** package (nested app folder). It imports shared domain code from the repo root **`src/`** (models, question bank, session helpers).

### Run the dev server

```bash
cd civics-test-sim
npm install
npm run dev
```

### Key components

- **`Session`** (`civics-test-sim/src/components/Session.tsx`) — Creates a session from `QUESTION_BANK`, shows the current question text, and embeds the answer area.
- **`Response`** (`civics-test-sim/src/components/Response.tsx`) — Accessible answer field (React Aria `Input`); submit wiring to `submitAnswer` is planned next.
- **UI primitives** (`civics-test-sim/src/components/untitled_ui/`) — Trimmed set: text `Input` + `Label`, and a primary/secondary `Button` for future submit/actions.

Styling uses the existing Tailwind/theme tokens from the Vite app (see `App.css`).

## Testing

### Running Tests

To run the manual test file:

```bash
ts-node src/dev/manualTest.ts
```

This will execute the manual test script that demonstrates:
- Creating responses for correct and incorrect answers
- Creating a new session from a question bank (filter + random selection)
- Retrieving the current question from a session
- Session completion helpers (`isSessionComplete`)

### Prerequisites

- `ts-node` must be installed globally or available via `npx`
- TypeScript configuration is defined in `tsconfig.json`

## Session Management Functions

### When to Use Each Function

**`filterEligibleQuestions()`** - Narrows the question bank for Phase 1:
- Takes the full question bank and returns only questions eligible for the current rules
- Phase 1: keeps `answer_type === 'static'` (excludes dynamic and state-specific until later phases)
- Returns a new array; does not mutate the input

**`selectRandomQuestions()`** - Builds the session’s question list:
- Takes eligible questions, shuffles them (Fisher–Yates), returns up to 20 questions
- If fewer than 20 are eligible, returns all of them in random order
- Used by `createSession` after filtering

**`createSession()`** - Creates a brand new session from scratch:
- Use when starting a new test session (beginning of the flow)
- Requires a full `questions` array; runs `filterEligibleQuestions` then `selectRandomQuestions`
- Throws if no eligible questions exist after filtering
- Generates a new session ID
- Initializes all counters to 0, sets `currentIndex` to 0, status `"in_progress"`
- Merges `sessionConfig` with defaults (mode, state, thresholds)
- Creates an empty `responses` array

**`submitAnswer()`** - Updates an existing session:
- Use when processing an answer during an ongoing session (middle of the flow)
- Takes an existing session as input
- Creates a response object by grading the answer
- Updates counters based on the answer
- Appends the response to the responses array
- Updates status based on thresholds (pass/fail/completed/in_progress)
- Conditionally increments index (only if still in progress)
- Returns a new session object without mutating the input

**`getCurrentQuestion()`** - Pure selector that returns the current question:
- Use when you need to retrieve the question that should be displayed to the user
- Returns the Question object at `currentIndex` if the session is in progress and index is valid
- Returns `null` if the session is not in progress (status is not `'in_progress'`)
- Returns `null` if the currentIndex is out of bounds (no more questions available)
- Note: `null` is not an error - it indicates the session has reached a threshold and no more questions need to be retrieved

**`isSessionComplete()`** - Pure helper function that checks if a session is complete:
- Use as a descriptive replacement for `status !== 'in_progress'` checks
- Returns `true` if the session status is `'passed'`, `'failed'`, or `'completed'`
- Returns `false` if the session status is `'in_progress'`
- Makes code more readable by using a descriptive function name instead of status comparisons
