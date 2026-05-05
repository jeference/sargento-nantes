"use client";

import PhoneInput from "react-phone-number-input";
import { ShieldAlert } from "lucide-react";
import "react-phone-number-input/style.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (phoneNumber: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function PhoneNumberInputField({
  value,
  onChange,
  onBlur,
  error,
  disabled,
}: PhoneNumberInputProps) {
  return (
    <div>
      <PhoneInput
        defaultCountry="BR"
        placeholder="Seu WhatsApp"
        value={value || undefined}
        onChange={(val) => onChange(val || "")}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={!!error}
        className="input-dark flex w-full items-center gap-2 rounded-lg px-4 py-3.5 text-base"
        numberInputProps={{
          className:
            "min-w-0 flex-1 border-0 bg-transparent text-base text-bone outline-none placeholder:text-[#5a5a5a]",
          "aria-label": "Seu WhatsApp",
        }}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <ShieldAlert className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
