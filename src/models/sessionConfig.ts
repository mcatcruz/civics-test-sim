const STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
] as const;

// String Unions (Type Aliases)
type Mode = "mock" | "practice";
type State = typeof STATES[number]

// Number Unions
type MaxQuestions = 10 | 20;
type PassThreshold = 6 | 12;
type FailThreshold = 5 | 9;

// Optional fields are post-MVP. Required fields will have default values. 
    mode: Mode;
    state: State;
    age?: number;
    years_as_LPR?: number; 
    max_questions: MaxQuestions;
    pass_threshold: PassThreshold;
    fail_threshold: FailThreshold;
}
