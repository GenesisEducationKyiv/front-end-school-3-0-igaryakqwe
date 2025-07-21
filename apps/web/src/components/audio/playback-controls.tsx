import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import useAudioStore from '@/store/use-audio-store';

interface PlaybackControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const PlaybackControls = memo(
  ({ isPlaying, onTogglePlay, onPrevious, onNext }: PlaybackControlProps) => {
    const id = useAudioStore((state) => state.currentTrackId);
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onPrevious}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          onClick={onTogglePlay}
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full shadow-md"
          data-testid={isPlaying ? `pause-button-${id}` : `play-button-${id}`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onNext}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

PlaybackControls.displayName = 'PlaybackControls';

export default PlaybackControls;
