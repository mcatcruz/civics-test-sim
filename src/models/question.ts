// String Unions
type Category = "american_government" | "american_history" | "symbols_and_holidays";
type GradingMode = "exact" | "one_of" | "multi";
type AnswerType = "static" | "dynamic_official" | "state_specific";
type USCISCivicsQuestionsVersion = "2025" | "2008";

interface Note {
    timestamp: string;
    note: string;
    source: string;
}

export interface Question {
    id: number;
    question_text: string;
    acceptable_answers: string[];
    acceptable_answers_norm?: string[];
    is_65_20_starred: boolean;
    category: Category;
    grading_mode: GradingMode;
    answer_type: AnswerType;
    required_count?: number;
    notes?: Note[];
    uscis_civics_questions_version: USCISCivicsQuestionsVersion;
}