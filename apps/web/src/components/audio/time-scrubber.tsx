import { memo } from 'react';

import TimeDisplay from '@/components/audio/time-display';
import WaveformVisualizer from '@/components/audio/waveform-visualizer';
import { Slider } from '@/components/ui/slider';
import useAudioStore from '@/store/use-audio-store';

interface TimeScrubberProps {
  currentTime: number;
  duration: number;
  onTimeChange: (value: number[]) => void;
  showWaveform?: boolean;
}

const TimeScrubber = memo(
  ({
    currentTime,
    duration,
    onTimeChange,
    showWaveform = false,
  }: TimeScrubberProps) => {
    const id = useAudioStore((state) => state.currentTrackId);
    return (
      <div className="max-w-[500px] flex items-center space-x-2 w-full">
        <TimeDisplay time={currentTime} />
        <div className="relative flex-1">
          {showWaveform && (
            <WaveformVisualizer
              currentTime={currentTime}
              duration={duration}
              color="#f4f4f5"
              progressColor="#8e51ff"
              className="absolute -top-[13px] "
            />
          )}
          <Slider
            data-testid={`audio-progress-${id}`}
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={onTimeChange}
            className="h-full cursor-pointer relative z-10"
            trackClassName={showWaveform ? 'opacity-0' : ''}
          />
        </div>
        <TimeDisplay time={duration} />
      </div>
    );
  }
);

TimeScrubber.displayName = 'TimeScrubber';

export default TimeScrubber;
