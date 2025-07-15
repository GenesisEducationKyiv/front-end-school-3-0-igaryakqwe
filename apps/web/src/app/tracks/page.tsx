import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';

import {
  convertNullToUndefined,
  loadSearchParams,
  tracksQueryOptions,
} from '@/features/tracks/lib/utils';
import TracksPage from '@/features/tracks/tracks.page';
import { getQueryClient } from '@/lib/query-client';

export const dynamic = 'force-dynamic';

interface TracksProps {
  searchParams: Promise<SearchParams>;
}

const Tracks = async ({ searchParams }: TracksProps) => {
  const params = await loadSearchParams(searchParams);
  const sanitizedParams = convertNullToUndefined(params);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(tracksQueryOptions(sanitizedParams));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TracksPage />
    </HydrationBoundary>
  );
};

export default Tracks;
