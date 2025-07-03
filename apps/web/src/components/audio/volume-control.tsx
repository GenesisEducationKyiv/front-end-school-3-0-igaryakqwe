import { Volume2, VolumeX } from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
}

const VolumeControl = memo(
  ({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onToggleMute}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>

      <Slider
        value={[!isMuted ? volume : 0]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
        className="w-24 cursor-pointer"
      />
    </div>
  )
);

VolumeControl.displayName = 'VolumeControl';

export default VolumeControl;
