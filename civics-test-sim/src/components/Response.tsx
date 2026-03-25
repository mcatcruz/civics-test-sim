import { Input } from "./untitled_ui/base/input/input";
import { Button } from "./untitled_ui/base/buttons/button";

export type ResponseProps = {
    /** Current answer text; owned by parent (`Session`) for controlled input. */
    rawUserInput: string;
    /** React Aria `TextField` callback: receives the new string (not a DOM event). */
    onChange: (value: string) => void;
    /** Called after valid form submit; parent runs `submitAnswer` and clears the draft. */
    onSubmit: () => void;
    /** When there is no active question (e.g. session finished), submit is disabled and form submit is ignored. */
    isSubmitDisabled: boolean;
};

/**
 * Answer entry for the civics interview UI.
 *
 * Controlled `Input` plus a submit `Button` inside a `<form>`. Does not import domain logic:
 * parent supplies state and `onSubmit`. Uses `preventDefault` on submit; blocks `onSubmit`
 * when `isSubmitDisabled` so Enter cannot bypass a disabled button.
 */
export function Response({ rawUserInput, onChange, onSubmit, isSubmitDisabled }: ResponseProps) {
    return (
        <form
            className="mt-4 flex w-full max-w-xl flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                if (isSubmitDisabled) return;
                onSubmit();
            }}
        >
            <Input
                isRequired
                label="Response"
                placeholder="Answer here"
                value={rawUserInput}
                onChange={onChange}
            />
            <Button type="submit" isDisabled={isSubmitDisabled}>
                Submit answer
            </Button>
        </form>
    );
}