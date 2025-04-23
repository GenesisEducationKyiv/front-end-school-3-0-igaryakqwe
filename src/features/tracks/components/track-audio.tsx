'use client';

import { memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PlaybackControls from '@/components/audio/playback-controls';
import TimeScrubber from '@/components/audio/time-scrubber';
import type { Track } from '@/types/entities/track.ts';
import useAudioStore from '@/store/use-audio-store';
import { getAudioFile } from '@/features/tracks/lib/utils.ts';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Trash2Icon } from 'lucide-react';
import useRemoveTrackMutation from '@/features/tracks/hooks/use-remove-track-mutation.ts';

interface TrackAudioProps {
  track: Track;
}

const TrackAudio = ({ track }: TrackAudioProps) => {
  const {
    globalAudioRef,
    currentTrackId,
    isPlaying,
    currentTime,
    setCurrentTrackId,
    setCurrentTime,
    togglePlay,
    addToQueue,
    removeFromQueue,
    previous,
    next,
  } = useAudioStore();

  const isThisPlaying = isPlaying && currentTrackId === track.id;

  const [localDuration, setLocalDuration] = useState(0);

  const { removeTrack, isRemoving } = useRemoveTrackMutation();

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
  }, [track.audioFile, globalAudioRef, currentTrackId]);

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
    removeTrack(track.id);
    removeFromQueue(track.id);
  };

  return (
    <Card className="w-full bg-slate-50 dark:bg-slate-900 p-0 shadow-md">
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
            currentTime={currentTrackId === track.id ? currentTime : 0}
            duration={localDuration}
            onTimeChange={handleTimeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(TrackAudio);
