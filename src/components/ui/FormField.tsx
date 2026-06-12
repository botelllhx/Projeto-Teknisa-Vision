import type { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldOption = { value: string; label: string };

/**
 * Campo de formulário **estilo Klyro**: input/textarea/select como **linha** (border só embaixo, sem
 * box), foco em **azul** (`focus:border-primary`). **`<label>` real** sempre associado (a11y, não só
 * placeholder), `aria-invalid`/`aria-describedby` + mensagem de erro com `role="alert"`. Usado na
 * §13 (ConversionSection). Tudo controlado por estado React (sem libs de form).
 */
const FIELD =
  "mt-2 w-full border-0 border-b-2 border-border bg-transparent px-0 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary";

export function FormField({
  id,
  label,
  value,
  onChange,
  as = "input",
  type = "text",
  required = false,
  error,
  placeholder,
  options,
  rows = 4,
  autoComplete,
  inputMode,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  as?: "input" | "textarea" | "select";
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  options?: FieldOption[];
  rows?: number;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  className?: string;
}) {
  const invalid = Boolean(error);
  const cls = cn(FIELD, invalid && "border-destructive focus:border-destructive");
  const a11y = {
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? `${id}-error` : undefined,
  };
  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange(e.target.value);

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/70">
        {label}
        {required && (
          <span className="text-primary" aria-hidden>
            {" *"}
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={handle}
          rows={rows}
          placeholder={placeholder}
          required={required}
          {...a11y}
          className={cn(cls, "resize-none")}
        />
      ) : as === "select" ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={handle}
            required={required}
            {...a11y}
            className={cn(cls, "cursor-pointer appearance-none pr-7", !value && "text-foreground/35")}
          >
            <option value="">{placeholder ?? "Selecione"}</option>
            {options?.map((o) => (
              <option key={o.value} value={o.value} className="text-foreground">
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            aria-hidden
          />
        </div>
      ) : (
        <input
          id={id}
          value={value}
          onChange={handle}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          {...a11y}
          className={cls}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
