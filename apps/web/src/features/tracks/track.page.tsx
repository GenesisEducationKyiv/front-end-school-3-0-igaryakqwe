import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MusicIcon } from 'lucide-react';
import TrackImage from '@/features/tracks/components/track-image';
import TrackAudio from '@/features/tracks/components/track-audio';
import { Track } from '@/types/entities/track';
import TrackUpload from '@/features/tracks/components/track-upload';
import TrackMetadata from '@/features/tracks/components/track-metadata';

interface TrackPageProps {
  track: Track;
}

const TrackPage = ({ track }: TrackPageProps) => {
  return (
    <div className="min-h-[80dvh] bg-background p-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-0 rounded-sm">
              <CardContent className="p-0 relative group">
                <TrackImage
                  image={track.coverImage ?? undefined}
                  alt={`${track.title} cover`}
                  isLCP
                  className="object-cover  rounded-sm overflow-hidden"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{track.title}</h1>
              {track.artist && (
                <p className="text-xl text-muted-foreground">
                  by {track.artist}
                </p>
              )}
              {track.album && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MusicIcon className="w-4 h-4" />
                  <span>from "{track.album}"</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {track.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {track.audioFile ? (
              <TrackAudio track={track} />
            ) : (
              <TrackUpload trackId={track.id} />
            )}

            <TrackMetadata {...track} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
