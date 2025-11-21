import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-20">
        <div className="container space-y-6 text-center">
          <Badge tone="wine" className="mx-auto w-fit">
            Shop
          </Badge>
          <h1 className="font-serif text-4xl font-bold">Køb vin gennem os</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Vi samler links til importører og butikker vi samarbejder med, så du hurtigt kan købe de vine
            vi omtaler. Vi tager kun partnere ind, der deler vores værdier om åbenhed og kvalitet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                Se alle partnere
              </a>
            </Button>
            <Button variant="outline">Kontakt for samarbejde</Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container space-y-10">
          <h2 className="font-serif text-3xl font-bold">Sådan fungerer shoppen</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Kuraterede links",
                description:
                  "Vi linker kun til flasker og butikker vi selv handler hos. Alle links er markeret tydeligt.",
              },
              {
                title: "Ingen ekstra pris",
                description:
                  "Prisen er den samme, hvad end du køber gennem os eller direkte hos importøren.",
              },
              {
                title: "Støt Vinovenner",
                description:
                  "Nogle links giver os en lille kommission. Det hjælper os med at lave mere gratis indhold.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

