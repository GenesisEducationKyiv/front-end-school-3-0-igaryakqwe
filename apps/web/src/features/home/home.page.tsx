import { CTA } from '@/features/home/components/cta';
import { Features } from '@/features/home/components/features';
import Hero from '@/features/home/components/hero';
import { Stats } from '@/features/home/components/stats';
import { tracksQueryOptions } from '@/features/tracks/lib/utils';
import { getQueryClient } from '@/lib/query-client';

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(tracksQueryOptions({ limit: 1 }));

  return (
    <main className="bg-background">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </main>
  );
};

export default HomePage;
