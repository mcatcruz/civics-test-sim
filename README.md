# “USCIS Civics Mock Interview (MVP)”

Upon project completion, the USCIS Civics Mock Interview (MVP) will be able to ask up to 20 questions from the USCIS official questions, receive and grade typed answers, and show user their results.

Phase 1 will be text-based and have seamless quiz flow and grading logic. Phase 1 will not have a separate flow for users 65+ nor will it have state-specific questions. Furthermore, Phase 1 will not have TTS functionality.

## Testing

### Running Tests

To run the manual test file:

```bash
ts-node src/dev/manualTest.ts
```

This will execute the manual test script that demonstrates:
- Creating responses for correct and incorrect answers
- Creating a new session with a custom configuration
- Retrieving the current question from a session

### Prerequisites

- `ts-node` must be installed globally or available via `npx`
- TypeScript configuration is defined in `tsconfig.json`

## Session Management Functions

### When to Use Each Function

**`createSession()`** - Creates a brand new session from scratch:
- Use when starting a new test session (beginning of the flow)
- Generates a new session ID
- Initializes all counters to 0
- Sets `currentIndex` to 0
- Sets status to `"in_progress"`
- Selects questions (from config or hardcoded)
- Sets up the initial config
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
