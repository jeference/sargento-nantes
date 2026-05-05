"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
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
        placeholder="Seu número de WhatsApp"
        value={value || undefined}
        onChange={(val) => onChange(val || "")}
        onBlur={onBlur}
        defaultCountry="BR"
        international
        countryCallingCodeEditable={false}
        disabled={disabled}
        className={`input-dark w-full rounded-lg px-4 py-3.5 text-base`}
        numberInputProps={{
          className: "input-dark w-full text-base",
          id: "phone",
        }}
        style={{
          outline: "none",
          border: error ? "1px solid rgb(228, 87, 46)" : "1px solid rgb(42, 42, 42)",
          borderRadius: "0.5rem",
          padding: "0.875rem 1rem",
          backgroundColor: "rgb(15, 15, 15)",
          color: "rgb(237, 237, 237)",
          fontSize: "1rem",
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
