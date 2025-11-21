"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    (event.currentTarget as HTMLFormElement).reset();
  }

  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-16">
        <div className="container text-center">
          <h1 className="font-serif text-4xl font-bold">Kontakt os</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Har du spørgsmål, forslag eller vil du samarbejde? Skriv til os her.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <InfoCard
              icon={<Mail className="h-8 w-8 text-primary" />}
              title="E-mail"
              description="kontakt@vinovenner.dk"
              href="mailto:kontakt@vinovenner.dk"
            />
            <InfoCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Svartid"
              description="Vi svarer typisk inden for 1-2 hverdage"
            />
            <InfoCard
              icon={<MapPin className="h-8 w-8 text-primary" />}
              title="Lokation"
              description="København, Danmark"
            />
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10 space-y-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Navn *">
                  <input
                    required
                    name="name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Dit fulde navn"
                  />
                </Field>
                <Field label="E-mail *">
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="din@email.dk"
                  />
                </Field>
              </div>

              <Field label="Emne *">
                <select
                  required
                  name="subject"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Vælg et emne</option>
                  <option value="general">Generelt spørgsmål</option>
                  <option value="collaboration">Samarbejde</option>
                  <option value="event">Event/Smagning</option>
                  <option value="press">Presse</option>
                  <option value="other">Andet</option>
                </select>
              </Field>

              <Field label="Besked *">
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Skriv din besked her..."
                />
              </Field>

              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input required type="checkbox" className="mt-1 rounded border-border" />
                Jeg accepterer at mine oplysninger bruges til at besvare min henvendelse i henhold til{" "}
                <Link href="/privatliv" className="text-primary underline-offset-4 hover:underline">
                  privatlivspolitikken
                </Link>
                .
              </label>

              <div className="space-y-2">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Sender..." : "Send besked"}
                </Button>
                <p className="text-xs text-muted-foreground">* Obligatoriske felter</p>
                {submitted && (
                  <p className="text-sm text-primary">Tak for din besked! Vi vender tilbage snart.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div>{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

