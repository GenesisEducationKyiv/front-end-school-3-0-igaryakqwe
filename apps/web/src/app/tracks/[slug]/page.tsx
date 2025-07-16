import { getTrackBySlug, getTracks } from '@/features/tracks/api/tracks.api';
import TrackPage from '@/features/tracks/track.page';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const tracks = await getTracks();

  return (
    tracks?.data.map((track) => ({
      slug: track.slug,
    })) ?? []
  );
};

interface TrackProps {
  params: Promise<{ slug: string }>;
}

const Track = async ({ params }: TrackProps) => {
  const track = await getTrackBySlug((await params).slug);

  if (!track) notFound();

  return <TrackPage track={track} />;
};

export default Track;
