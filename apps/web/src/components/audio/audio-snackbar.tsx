import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import AudioPlayer from '@/components/audio/audio-player';
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
            className="sticky max-w-[90%] lg:max-w-5xl mx-auto bottom-5 mt-5 left-0 w-full z-50 rounded-lg p-3 bg-card text-card-foreground border shadow-sm"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <AudioPlayer
              trackName={trackName}
              trackArtist={trackArtist}
              coverImage={currentStoreTrack?.coverImage ?? undefined}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onPrevious={previous}
              onNext={next}
              currentTime={currentTime}
              duration={duration}
              onTimeChange={handleTimeChange}
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={handleVolumeChange}
              onToggleMute={toggleMute}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioSnackbar;
