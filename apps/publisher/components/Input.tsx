"use client";
import clsx from "clsx";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

const baseField =
  "block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

type FieldWrapProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  id?: string;
  children: ReactNode;
  className?: string;
};

export function FieldWrap({
  label,
  hint,
  error,
  id,
  children,
  className,
}: FieldWrapProps) {
  return (
    <div className={clsx("space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapClassName?: string;
};

export function Input({
  label,
  hint,
  error,
  wrapClassName,
  id,
  className,
  ...rest
}: InputProps) {
  return (
    <FieldWrap
      label={label}
      hint={hint}
      error={error}
      id={id}
      className={wrapClassName}
    >
      <input id={id} {...rest} className={clsx(baseField, className)} />
    </FieldWrap>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapClassName?: string;
};

export function Textarea({
  label,
  hint,
  error,
  wrapClassName,
  id,
  className,
  ...rest
}: TextareaProps) {
  return (
    <FieldWrap
      label={label}
      hint={hint}
      error={error}
      id={id}
      className={wrapClassName}
    >
      <textarea id={id} {...rest} className={clsx(baseField, className)} />
    </FieldWrap>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapClassName?: string;
};

export function Select({
  label,
  hint,
  error,
  wrapClassName,
  id,
  className,
  children,
  ...rest
}: SelectProps) {
  return (
    <FieldWrap
      label={label}
      hint={hint}
      error={error}
      id={id}
      className={wrapClassName}
    >
      <select id={id} {...rest} className={clsx(baseField, className)}>
        {children}
      </select>
    </FieldWrap>
  );
}
