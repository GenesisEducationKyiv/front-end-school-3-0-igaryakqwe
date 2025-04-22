import { memo } from 'react';
import { Slider } from '@/components/ui/slider.tsx';
import TimeDisplay from '@/components/audio/time-display.tsx';

interface TimeScrubberProps {
  currentTime: number;
  duration: number;
  onTimeChange: (value: number[]) => void;
}

const TimeScrubber = memo(
  ({ currentTime, duration, onTimeChange }: TimeScrubberProps) => (
    <div className="flex items-center space-x-2 w-full">
      <TimeDisplay time={currentTime} />
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.1}
        onValueChange={onTimeChange}
        className="cursor-pointer"
      />
      <TimeDisplay time={duration} />
    </div>
  )
);

TimeScrubber.displayName = 'TimeScrubber';

export default TimeScrubber;
