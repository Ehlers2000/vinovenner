"use client";

import { clsx } from "clsx";
import { useState } from "react";

import { Button } from "./ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({
  layout = "horizontal",
  compact = false,
}: {
  layout?: "horizontal" | "vertical";
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Angiv en gyldig e-mail.");
      return;
    }

    if (!consent) {
      setError("Bekræft venligst samtykke til at modtage mails.");
      return;
    }

    setStatus("submitting");

    // Placeholder: hook up to real API or ESP later.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    setEmail("");
    setConsent(false);
  };

  return (
    <form
      className={clsx(
        "w-full max-w-xl rounded-2xl border border-graphite-100 bg-white p-6 shadow-card",
        compact ? "p-5" : "md:p-8",
      )}
      onSubmit={handleSubmit}
      aria-live="polite"
      data-analytics="newsletter-form"
    >
      <div className="flex flex-col gap-4 text-center">
        <h3 className="font-serif text-2xl text-graphite-900">
          Få ærlige anbefalinger
        </h3>
        <p className="text-sm text-graphite-600 sm:text-base">
          1–2 gange om måneden sender vi vine vi selv drikker. Ingen spam.
        </p>
      </div>
      <div
        className={clsx(
          "mt-6 flex flex-col gap-4",
          layout === "horizontal" ? "sm:flex-row sm:items-end" : "",
        )}
      >
        <div className="flex-1">
          <label
            htmlFor="newsletter-email"
            className="block text-sm font-semibold text-graphite-800"
          >
            Din e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-graphite-200 bg-cream-25 px-4 py-3 text-base text-graphite-900 shadow-sm focus:border-wine-500 focus:outline-none focus:ring-2 focus:ring-wine-200"
            placeholder="navn@eksempel.dk"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <Button
          type="submit"
          className={clsx(
            layout === "horizontal" ? "sm:flex-none sm:w-auto" : "",
            layout === "horizontal" ? "w-full sm:w-auto" : "w-full",
          )}
          disabled={status === "submitting"}
        >
          {status === "success" ? "Tak for tilmeldingen!" : "Tilmeld nyhedsbrev"}
        </Button>
      </div>
      <label className="mt-4 flex items-start gap-3 text-left text-sm text-graphite-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-graphite-300 text-wine-700 focus:ring-wine-500"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          disabled={status === "submitting"}
          required
        />
        <span>Ja tak — send mig ærlige anbefalinger. Jeg accepterer vilkår og privatlivspolitik.</span>
      </label>
      {error && <p className="mt-3 text-sm text-wine-600">{error}</p>}
      {status === "success" && !error && (
        <p className="mt-3 text-sm text-forest-600">Vi glæder os til at sende dig næste anbefaling.</p>
      )}
    </form>
  );
}

