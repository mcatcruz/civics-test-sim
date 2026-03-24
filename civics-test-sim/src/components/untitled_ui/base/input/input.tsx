import type { Ref } from "react";
import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Group as AriaGroup, Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { Label } from "./label";
import { cx } from "../../utils/cx";

export interface InputProps extends AriaTextFieldProps {
    /** Visible label above the field */
    label?: string;
    placeholder?: string;
    /** Extra classes on the native input */
    inputClassName?: string;
    /** Extra classes on the bordered wrapper */
    wrapperClassName?: string;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    /** When false, label does not show the required asterisk even if the field is required */
    hideRequiredIndicator?: boolean;
}

/**
 * Single-line text input with optional label. Built for the civics answer field in `Response`.
 */
export const Input = ({
    label,
    placeholder,
    className,
    ref,
    groupRef,
    inputClassName,
    wrapperClassName,
    hideRequiredIndicator,
    ...props
}: InputProps) => {
    return (
        <AriaTextField
            {...props}
            aria-label={!label ? placeholder : undefined}
            className={(state) =>
                cx(
                    "group flex h-max w-full flex-col items-start justify-start gap-1.5",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isRequired, isInvalid }) => (
                <>
                    {label ? (
                        <Label
                            isRequired={hideRequiredIndicator ? false : isRequired}
                            isInvalid={isInvalid}
                        >
                            {label}
                        </Label>
                    ) : null}

                    <AriaGroup
                        ref={groupRef}
                        className={({ isFocusWithin, isDisabled, isInvalid: groupInvalid }) =>
                            cx(
                                "group/input relative flex w-full flex-row rounded-lg bg-primary shadow-xs ring-1 ring-primary ring-inset transition-shadow duration-100 ease-linear",
                                isFocusWithin && !isDisabled && "ring-2 ring-brand",
                                isDisabled && "cursor-not-allowed opacity-50",
                                groupInvalid && "ring-error_subtle",
                                groupInvalid && isFocusWithin && "ring-2 ring-error",
                                wrapperClassName,
                            )
                        }
                    >
                        <AriaInput
                            ref={ref}
                            placeholder={placeholder}
                            className={cx(
                                "m-0 w-full bg-transparent px-3 py-2 text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary disabled:cursor-not-allowed",
                                inputClassName,
                            )}
                        />
                    </AriaGroup>
                </>
            )}
        </AriaTextField>
    );
};

Input.displayName = "Input";
