import { Input } from "./untitled_ui/base/input/input";
import { Button } from "./untitled_ui/base/buttons/button";

export type ResponseProps = {
    rawUserInput: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

/**
 * Answer entry for the civics interview UI.
 *
 * Draft text lives in `Session`; this component is controlled via `rawUserInput` + `onChange`.
 */
export function Response({ rawUserInput, onChange, onSubmit }: ResponseProps) {
    return (
        <form
            className="mt-4 flex w-full max-w-xl flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault();
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
            <Button type="submit">Submit answer</Button>
        </form>
    );
}