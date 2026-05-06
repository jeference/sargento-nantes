"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, ShieldAlert } from "lucide-react";

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
  onStateChange: (uf: string) => void;
  onCityChange: (city: string) => void;
  stateError?: string;
  cityError?: string;
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
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: BrazilianState[]) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!state) {
      setMunicipalities([]);
      return;
    }
    setLoadingMunicipalities(true);
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Municipality[]) => setMunicipalities(data))
      .catch(() => setMunicipalities([]))
      .finally(() => setLoadingMunicipalities(false));
  }, [state]);

  return (
    <div className="grid grid-cols-[88px_1fr] gap-2.5">
      <div>
        <div className="relative">
          <select
            value={state}
            onChange={(e) => {
              onStateChange(e.target.value);
              onCityChange("");
            }}
            aria-invalid={!!stateError}
            aria-label="Estado"
            className="input-dark w-full appearance-none rounded-lg px-3 py-3.5 pr-7 text-base"
          >
            <option value="">UF</option>
            {states.map((s) => (
              <option key={s.id} value={s.sigla}>
                {s.sigla}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
        </div>
        {stateError && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
            <ShieldAlert className="h-3.5 w-3.5" /> {stateError}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <input
            type="text"
            list="city-options"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            disabled={!state || loadingMunicipalities}
            placeholder={
              !state
                ? "Selecione a UF primeiro"
                : loadingMunicipalities
                ? "Carregando cidades…"
                : "Sua cidade"
            }
            aria-invalid={!!cityError}
            aria-label="Cidade"
            autoComplete="off"
            className="input-dark w-full rounded-lg px-4 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60"
          />
          <datalist id="city-options">
            {municipalities.map((m) => (
              <option key={m.id} value={m.nome} />
            ))}
          </datalist>
          {loadingMunicipalities && (
            <Loader2
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted"
            />
          )}
        </div>
        {cityError && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
            <ShieldAlert className="h-3.5 w-3.5" /> {cityError}
          </p>
        )}
      </div>
    </div>
  );
}
