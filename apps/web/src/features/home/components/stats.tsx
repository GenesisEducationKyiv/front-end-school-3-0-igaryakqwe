import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

const stats = [
  { name: 'Tracks Uploaded', value: '50K+' },
  { name: 'Active Users', value: '12K+' },
  { name: 'Hours Streamed', value: '1M+' },
];

export function Stats() {
  return (
    <section className="py-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-base font-semibold leading-7 text-foreground">
            Trusted by music lovers
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Growing every day
          </p>
        </div>

        <Card className="grid gap-0.5 divide-y *:py-8 *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.name}>
              <div className="text-foreground space-y-1 text-4xl font-bold">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.name}</p>
            </div>
          ))}
        </Card>
      </Container>
    </section>
  );
}
