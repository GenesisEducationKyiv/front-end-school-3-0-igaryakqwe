import React from 'react';

import TrackImage from '../../features/tracks/components/track-image';
import PlaybackControls from './playback-controls';
import TimeScrubber from './time-scrubber';
import VolumeControl from './volume-control';

interface AudioPlayerUIProps {
  trackName: string;
  trackArtist: string;
  coverImage?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onTimeChange: (time: number[]) => void;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number[]) => void;
  onToggleMute: () => void;
}

const AudioPlayer: React.FC<AudioPlayerUIProps> = ({
  trackName,
  trackArtist,
  coverImage,
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  currentTime,
  duration,
  onTimeChange,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const handleTimeChange = (value: number[]) => onTimeChange(value);
  const handleVolumeChange = (value: number[]) => onVolumeChange(value);

  return (
    <div className="flex justify-center lg:justify-between items-center flex-col lg:flex-row gap-5">
      <div className="flex grow gap-2 items-center justify-between flex-col lg:flex-row">
        <div className="flex gap-2">
          <TrackImage
            image={coverImage}
            alt={trackName}
            className="size-10 rounded-[10px] overflow-hidden"
          />
          <div className="mb-2 text-center lg:text-start w-[200px]">
            <h4 className="text-sm font-medium truncate">{trackName}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {trackArtist}
            </p>
          </div>
        </div>
        <PlaybackControls
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onPrevious={onPrevious}
          onNext={onNext}
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
        onToggleMute={onToggleMute}
      />
    </div>
  );
};

export default AudioPlayer;
