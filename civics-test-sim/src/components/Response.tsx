import { Input } from "./untitled_ui/base/input/input";

/**
 * Answer entry for the civics interview UI.
 *
 * Presents an accessible text field (React Aria) for the user's typed response.
 * Submit handling and grading will connect to `submitAnswer` and session state later.
 */
export const Response = () => {
    return <Input isRequired label="Response" placeholder="Answer here"/>;
};