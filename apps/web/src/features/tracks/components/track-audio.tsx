import { Loader2Icon, Trash2Icon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

import PlaybackControls from '@/components/audio/playback-controls';
import TimeScrubber from '@/components/audio/time-scrubber';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useRemoveTrackMutation from '@/features/tracks/hooks/mutations/use-remove-track-mutation';
import useTrackAudio from '@/features/tracks/hooks/use-track-audio';
import { getAudioFile } from '@/features/tracks/lib/utils';
import useAudioStore from '@/store/use-audio-store';
import type { Track } from '@/types/entities/track.ts';

interface TrackAudioProps {
  track: Track;
}

const TrackAudio = ({ track }: TrackAudioProps) => {
  const {
    currentTrackId,
    isPlaying,
    currentTime,
    globalAudioRef,
    isThisPlaying,
    setCurrentTrackId,
    setCurrentTime,
    togglePlay,
    addToQueue,
    removeFromQueue,
    previous,
    next,
  } = useTrackAudio({ trackId: track.id });

  const [localDuration, setLocalDuration] = useState(0);
  const { removeTrackFile, isRemoving } = useRemoveTrackMutation();

  useEffect(() => {
    const tempAudio = new Audio(getAudioFile(track?.audioFile));

    const handleLoadedMetadata = () => {
      if (!isNaN(tempAudio.duration)) {
        setLocalDuration(tempAudio.duration);
      }
    };

    tempAudio.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (
      globalAudioRef &&
      currentTrackId === track.id &&
      !isNaN(globalAudioRef.duration)
    ) {
      setLocalDuration(globalAudioRef.duration);
    }

    return () => {
      tempAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      tempAudio.src = '';
    };
  }, [track.audioFile, globalAudioRef, currentTrackId, track.id]);

  useEffect(() => {
    const trackInQueue = useAudioStore
      .getState()
      .queue.some((t) => t.id === track.id);
    if (!trackInQueue) {
      addToQueue(track);
    }
  }, [track, addToQueue]);

  const handleTogglePlay = () => {
    if (currentTrackId !== track.id) {
      setCurrentTrackId(track.id);
      setCurrentTime(0);
      if (isPlaying) return;
    }
    togglePlay();
  };

  const handleTimeChange = (newTime: number[]) => {
    if (currentTrackId !== track.id) {
      setCurrentTrackId(track.id);
    }
    setCurrentTime(newTime[0]);
  };

  const handleRemoveTrack = () => {
    if (currentTrackId === track.id) {
      next();
    }
    removeTrackFile(track.id);
    removeFromQueue(track.id);
  };

  return (
    <Card
      data-testid={`track-audio-${track.id}`}
      className="w-full p-0 bg-accent/20 shadow-md"
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-center relative">
            <PlaybackControls
              isPlaying={isThisPlaying}
              onTogglePlay={handleTogglePlay}
              onPrevious={previous}
              onNext={next}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 text-slate-500 hover:text-red-500 transition-colors"
              onClick={handleRemoveTrack}
            >
              {isRemoving ? (
                <Loader2Icon
                  data-testid="loading-indicator"
                  className="animate-spin text-muted-foreground"
                />
              ) : (
                <Trash2Icon />
              )}
            </Button>
          </div>

          <TimeScrubber
            currentTime={currentTime}
            duration={localDuration}
            onTimeChange={handleTimeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(TrackAudio);
