import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const manifesto = [
  {
    title: "Ærlighed først",
    description: "Vi anbefaler kun vine, vi selv ville købe og drikke. Ingen skjult reklame eller dårlige kompromiser.",
  },
  {
    title: "Kvalitet over hype",
    description: "Vi går efter smag, balance og håndværk – ikke fancy etiketter eller trendige navne.",
  },
  {
    title: "Pris og værdi",
    description: "God vin behøver ikke være dyr. Vi finder vine der giver mening for pengene – fra hverdag til fest.",
  },
  {
    title: "Ingen snobberi",
    description: "Vin skal være tilgængeligt og sjovt. Vi forklarer tingene klart uden fancy ord.",
  },
];

const team = [
  {
    name: "Tobias",
    role: "Medstifter & Vinentusiast",
    bio: "Elsker klassisk fransk vin og kan tale timevis om terroir. Står for de fleste smagninger.",
  },
  {
    name: "Stephan",
    role: "Medstifter & Videoansvarlig",
    bio: "Filmmageren bag kameraet. Elsker italiensk vin og eksperimenterer gerne med naturvin.",
  },
  {
    name: "Simon",
    role: "Gæstemager",
    bio: "Hjælper med events og dukker op når der skal smages vine. Ekstra stærk på spanske og tyske vine.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-16">
        <div className="container text-center">
          <h1 className="font-serif text-4xl font-bold">Om Vinovenner</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Vi er venner der deler en passion for vin – uden det store show.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
            <h2 className="text-center font-serif text-3xl font-bold">Hvad vi står for</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {manifesto.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-bold">Hvem er vi?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="aspect-square rounded-2xl bg-muted" />
                <h3 className="mt-6 font-serif text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="mt-3 text-sm text-foreground/80">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="rounded-3xl border border-border bg-muted p-8 text-center shadow-inner sm:p-12">
            <h2 className="font-serif text-3xl font-bold">Samarbejde med os?</h2>
            <p className="mt-4 text-muted-foreground">
              Vi arbejder med udvalgte importører og vinfirmaer, der deler vores værdier. Vi laver smagninger,
              producent-besøg og anbefalinger – altid med fuld gennemsigtighed.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <a href="mailto:kontakt@vinovenner.dk">
                  <Mail className="mr-2 h-4 w-4" />
                  Kontakt os
                </a>
              </Button>
              <Button variant="outline">Se samarbejdspakker</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container text-center">
          <h2 className="font-serif text-2xl font-bold">Presse</h2>
          <p className="mt-2 text-muted-foreground">Har du brug for logoer, billeder eller presseinfo?</p>
          <Button variant="outline" className="mt-4">
            Download pressekit
          </Button>
        </div>
      </section>
    </main>
  );
}

