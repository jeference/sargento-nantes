"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, ShieldAlert } from "lucide-react";

interface BrazilianState {
  id: number;
  sigla: string;
  nome: string;
}

interface Municipality {
  id: number;
  nome: string;
}

interface LocationSelectProps {
  state: string;
  city: string;
  onStateChange: (val: string) => void;
  onCityChange: (val: string) => void;
  stateError?: string;
  cityError?: string;
}

const COMBINING_MARKS = /[̀-ͯ]/g;

function normalize(s: string): string {
  return s.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase().trim();
}

interface ComboboxProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  ariaLabel: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
}

function Combobox({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  disabled,
  loading,
  error,
}: ComboboxProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [hasTyped, setHasTyped] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastEmittedRef = useRef<string>(value);
  const justPickedRef = useRef(false);

  // Sync query only when value changes EXTERNALLY (parent reset, etc).
  useEffect(() => {
    if (value !== lastEmittedRef.current) {
      lastEmittedRef.current = value;
      setQuery(value);
    }
  }, [value]);

  function emit(val: string) {
    if (val === lastEmittedRef.current) return;
    lastEmittedRef.current = val;
    onChange(val);
  }

  const filtered = useMemo(() => {
    if (!hasTyped) return options;
    const norm = normalize(query);
    if (!norm) return options;
    return options.filter((o) => normalize(o).includes(norm));
  }, [query, options, hasTyped]);

  useEffect(() => {
    setHighlight(0);
  }, [filtered.length]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function pick(opt: string) {
    justPickedRef.current = true;
    setQuery(opt);
    emit(opt);
    setOpen(false);
    setHasTyped(false);
  }

  function handleInputChange(text: string) {
    setQuery(text);
    setOpen(true);
    setHasTyped(true);
    const match = options.find((o) => normalize(o) === normalize(text));
    emit(match ?? "");
  }

  function handleBlur() {
    setOpen(false);
    setHasTyped(false);
    if (justPickedRef.current) {
      // Pick acabou de rodar — não tenta restaurar nada (closure ainda tem query/value antigos)
      justPickedRef.current = false;
      return;
    }
    const match = options.find((o) => normalize(o) === normalize(query));
    if (!match) {
      // Input não casa com nada válido — restaura para o último valor confirmado
      setQuery(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[highlight]) {
        e.preventDefault();
        pick(filtered[highlight]);
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  // Fecha o dropdown ao clicar fora — sem mexer em valor algum.
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!wrapperRef.current || wrapperRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div ref={wrapperRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-invalid={!!error}
          aria-label={ariaLabel}
          className="input-dark w-full rounded-lg px-4 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60"
        />

        {loading && (
          <Loader2
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted"
          />
        )}

        {open && !disabled && filtered.length > 0 && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-60 overflow-y-auto overscroll-contain rounded-lg border border-ink-500/60 bg-ink-800 py-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)]"
          >
            {filtered.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={i === highlight}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(opt);
                  inputRef.current?.blur();
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                  i === highlight
                    ? "bg-gold-500/15 text-bone"
                    : "text-bone/85 hover:bg-ink-700/60"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}

        {open && !disabled && hasTyped && query.trim() && filtered.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1.5 rounded-lg border border-ink-500/60 bg-ink-800 px-4 py-3 text-sm text-muted shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)]">
            Nenhum resultado
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <ShieldAlert className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

export function LocationSelect({
  state,
  city,
  onStateChange,
  onCityChange,
  stateError,
  cityError,
}: LocationSelectProps) {
  const [states, setStates] = useState<BrazilianState[]>([]);
  const [selectedSigla, setSelectedSigla] = useState<string>("");
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: BrazilianState[]) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!state || states.length === 0) {
      setSelectedSigla("");
      return;
    }
    const found = states.find((s) => normalize(s.nome) === normalize(state));
    setSelectedSigla(found?.sigla ?? "");
  }, [state, states]);

  useEffect(() => {
    if (!selectedSigla) {
      setMunicipalities([]);
      return;
    }
    setLoadingMunicipalities(true);
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedSigla}/municipios?orderBy=nome`
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Municipality[]) => setMunicipalities(data))
      .catch(() => setMunicipalities([]))
      .finally(() => setLoadingMunicipalities(false));
  }, [selectedSigla]);

  const stateOptions = useMemo(() => states.map((s) => s.nome), [states]);
  const cityOptions = useMemo(() => municipalities.map((m) => m.nome), [municipalities]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Combobox
        value={state}
        onChange={onStateChange}
        options={stateOptions}
        placeholder="Seu estado"
        ariaLabel="Estado"
        error={stateError}
      />
      <Combobox
        value={city}
        onChange={onCityChange}
        options={cityOptions}
        placeholder={
          !selectedSigla
            ? "Selecione o estado primeiro"
            : loadingMunicipalities
            ? "Carregando cidades…"
            : "Sua cidade"
        }
        ariaLabel="Cidade"
        disabled={!selectedSigla || loadingMunicipalities}
        loading={loadingMunicipalities}
        error={cityError}
      />
    </div>
  );
}
