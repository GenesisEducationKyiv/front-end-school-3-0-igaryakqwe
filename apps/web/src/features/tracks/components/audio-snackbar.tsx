import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import PlaybackControls from '@/components/audio/playback-controls';
import TimeScrubber from '@/components/audio/time-scrubber';
import VolumeControl from '@/components/audio/volume-control';
import { useActiveTrackStream } from '@/features/tracks/hooks/use-active-track.stream';
import useAudioController from '@/features/tracks/hooks/use-audio-controller';
import { getAudioFile } from '@/features/tracks/lib/utils';

const AudioSnackbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    audioRef,
    currentStoreTrack,
    isPlaying,
    togglePlay,
    next,
    previous,
    currentTime,
    duration,
    handleTimeChange,
    volume,
    isMuted,
    handleVolumeChange,
    toggleMute,
  } = useAudioController();

  const activeTrack = useActiveTrackStream(isPlaying, currentStoreTrack?.id);

  const trackName =
    activeTrack?.title ?? currentStoreTrack?.title ?? 'No track selected';
  const trackArtist = currentStoreTrack?.artist ?? 'Unknown artist';
  const audioFile = getAudioFile(currentStoreTrack?.audioFile);

  useEffect(() => {
    if (currentStoreTrack) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStoreTrack]);

  useEffect(() => {
    if (isPlaying) {
      setVisible(true);
    } else {
      if (!currentStoreTrack) {
        const timer = setTimeout(() => setVisible(false), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isPlaying, currentStoreTrack]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioFile}
        preload="metadata"
        className="hidden"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            data-testid={`audio-player-${currentStoreTrack?.id}`}
            className="sticky max-w-5xl mx-auto bottom-5 mt-2 left-0 w-full z-50 rounded-lg shadow-lg p-3 bg-accent border border-slate-200 dark:border-neutral-600 dark:bg-neutral-900"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-center lg:justify-between items-center flex-col lg:flex-row gap-5">
              <div className="flex grow gap-2 items-center justify-between flex-col lg:flex-row">
                <div className="mb-2 text-center lg:text-start w-[200px]">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {trackName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {trackArtist}
                  </p>
                </div>
                <PlaybackControls
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlay}
                  onPrevious={previous}
                  onNext={next}
                />
              </div>

              <TimeScrubber
                currentTime={currentTime}
                duration={duration}
                onTimeChange={handleTimeChange}
                showWaveform
              />

              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onToggleMute={toggleMute}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioSnackbar;
