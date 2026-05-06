"use client";

import { Fragment, useEffect, useState } from "react";
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
  onStateChange: (stateName: string) => void;
  onCityChange: (city: string) => void;
  stateError?: string;
  cityError?: string;
}

const COMBINING_MARKS = /[̀-ͯ]/g;

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(COMBINING_MARKS, "");
}

function normalize(s: string): string {
  return stripAccents(s).toLowerCase().trim();
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
    if (!state) {
      setSelectedSigla("");
      return;
    }
    if (states.length === 0) return;
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

  function handleStateInput(text: string) {
    const norm = normalize(text);
    const match = states.find((s) => normalize(s.nome) === norm);
    if (match) {
      onStateChange(match.nome);
    } else {
      onStateChange(text);
    }
  }

  function handleCityInput(text: string) {
    const norm = normalize(text);
    const match = municipalities.find((m) => normalize(m.nome) === norm);
    if (match) {
      onCityChange(match.nome);
    } else {
      onCityChange(text);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <input
          type="text"
          list="state-options"
          value={state}
          onChange={(e) => handleStateInput(e.target.value)}
          placeholder="Seu estado"
          aria-invalid={!!stateError}
          aria-label="Estado"
          autoComplete="off"
          className="input-dark w-full rounded-lg px-4 py-3.5 text-base"
        />
        <datalist id="state-options">
          {states.map((s) => {
            const stripped = stripAccents(s.nome);
            return (
              <Fragment key={s.id}>
                <option value={s.nome} />
                {stripped !== s.nome && <option value={stripped} />}
              </Fragment>
            );
          })}
        </datalist>
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
            onChange={(e) => handleCityInput(e.target.value)}
            disabled={!selectedSigla || loadingMunicipalities}
            placeholder={
              !selectedSigla
                ? "Selecione o estado primeiro"
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
            {municipalities.map((m) => {
              const stripped = stripAccents(m.nome);
              return (
                <Fragment key={m.id}>
                  <option value={m.nome} />
                  {stripped !== m.nome && <option value={stripped} />}
                </Fragment>
              );
            })}
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
