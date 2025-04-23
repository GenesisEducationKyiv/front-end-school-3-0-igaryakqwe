import { memo } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import useAudioStore from '@/store/use-audio-store.ts';

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
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          data-testid={isPlaying ? `pause-button-${id}` : `play-button-${id}`}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
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
