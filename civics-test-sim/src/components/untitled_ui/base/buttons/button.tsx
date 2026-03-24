import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "../../utils/cx";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends AriaButtonProps {
    /** Visual style; primary is the default submit-style button */
    variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: cx(
        "bg-brand-solid text-white shadow-xs ring-1 ring-transparent ring-inset",
        "hover:bg-brand-solid_hover",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
    ),
    secondary: cx(
        "bg-primary text-secondary shadow-xs ring-1 ring-primary ring-inset",
        "hover:bg-primary_hover hover:text-secondary_hover",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
    ),
};

/**
 * Accessible button built on React Aria. Use for submit and other actions.
 */
export function Button({ variant = "primary", className, children, type = "button", ...props }: ButtonProps) {
    return (
        <AriaButton
            type={type}
            {...props}
            className={(state) =>
                cx(
                    "inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-100 ease-linear",
                    variantClasses[variant],
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {children}
        </AriaButton>
    );
}

Button.displayName = "Button";
