import { memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PlaybackControls from '@/components/audio/playback-controls';
import TimeScrubber from '@/components/audio/time-scrubber';
import { type Track } from '@/types/entities/track.ts';
import useAudioStore from '@/store/use-audio-store';
import { getAudioFile } from '@/features/tracks/lib/utils.ts';

interface TrackAudioProps {
  track: Track;
}

const TrackAudio = ({ track }: TrackAudioProps) => {
  const currentTrackId = useAudioStore((state) => state.currentTrackId);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentTime = useAudioStore((state) => state.currentTime);
  const globalAudioRef = useAudioStore((state) => state.globalAudioRef);

  const setCurrentTrackId = useAudioStore((state) => state.setCurrentTrackId);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const next = useAudioStore((state) => state.next);
  const previous = useAudioStore((state) => state.previous);
  const addToQueue = useAudioStore((state) => state.addToQueue);

  const isThisPlaying = isPlaying && currentTrackId === track.id;

  const [localDuration, setLocalDuration] = useState(0);

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

  return (
    <Card className="w-full bg-slate-50 dark:bg-slate-900 p-0 shadow-md">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <PlaybackControls
              isPlaying={isThisPlaying}
              onTogglePlay={handleTogglePlay}
              onPrevious={previous}
              onNext={next}
            />
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
