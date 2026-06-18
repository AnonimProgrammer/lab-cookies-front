import React from "react";

export default function Field({ id, label, error, inputRef, ...props }) {
  const baseClass =
    "bg-[#1e1e1e] border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 field-focus transition-all duration-200";

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-foreground font-bold">
        {label}
      </span>
      <input
        id={id}
        ref={inputRef}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        required
        className={`${baseClass} ${error ? "border-red-500" : "border-surface-border"}`}
      />

      {error && (
        <p id={`${id}-error`} role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </label>
  );
}
