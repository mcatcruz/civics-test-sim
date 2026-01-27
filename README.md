# “USCIS Civics Mock Interview (MVP)”

Upon project completion, the USCIS Civics Mock Interview (MVP) will be able to ask up to 20 questions from the USCIS official questions, receive and grade typed answers, and show user their results.

Phase 1 will be text-based and have seamless quiz flow and grading logic. Phase 1 will not have a separate flow for users 65+ nor will it have state-specific questions. Furthermore, Phase 1 will not have TTS functionality.

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
