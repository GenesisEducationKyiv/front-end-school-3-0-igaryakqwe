import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAudioStore from '@/store/use-audio-store';
import PlaybackControls from '@/components/audio/playback-controls';
import VolumeControl from '@/components/audio/volume-control';
import TimeScrubber from '@/components/audio/time-scrubber';
import { getAudioFile } from '@/features/tracks/lib/utils.ts';

const AudioSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentTime = useAudioStore((state) => state.currentTime);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const currentStoreTrack = useAudioStore((state) => state.getCurrentTrack());
  const setGlobalAudioRef = useAudioStore((state) => state.setGlobalAudioRef);

  const togglePlay = useAudioStore((state) => state.togglePlay);
  const next = useAudioStore((state) => state.next);
  const previous = useAudioStore((state) => state.previous);
  const setVolume = useAudioStore((state) => state.setVolume);
  const toggleMute = useAudioStore((state) => state.toggleMute);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);

  const trackName = currentStoreTrack?.title || 'No track selected';
  const trackArtist = currentStoreTrack?.artist || 'Unknown artist';
  const audioFile = getAudioFile(currentStoreTrack?.audioFile) as string;

  useEffect(() => {
    if (audioRef.current) {
      setGlobalAudioRef(audioRef.current);
    }
  }, [setGlobalAudioRef]);

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

  useEffect(() => {
    if (audioRef.current && currentStoreTrack) {
      audioRef.current.src = audioFile;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  }, [audioFile, currentStoreTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (
      audioRef.current &&
      Math.abs(audioRef.current.currentTime - currentTime) > 1
    ) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleEnded = () => {
      next();
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }
    };
  }, [next, setCurrentTime]);

  const handleTimeChange = useCallback(
    (newTime: number[]) => {
      setCurrentTime(newTime[0]);
    },
    [setCurrentTime]
  );

  const handleVolumeChange = useCallback(
    (newVolume: number[]) => {
      setVolume(newVolume[0]);
    },
    [setVolume]
  );

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
            className="sticky max-w-5xl mx-auto bottom-5 mt-5 left-0 w-full bg-white z-50 rounded-lg shadow-lg p-3 border border-slate-200"
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
