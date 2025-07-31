import { useEffect, useRef, useState } from 'react';

import { getAudioFile } from '@/features/tracks/lib/utils';
import { cn } from '@/lib/utils';
import useAudioStore from '@/store/use-audio-store';

interface WaveformVisualizerProps {
  className?: string;
  color?: string;
  progressColor?: string;
  currentTime: number;
  duration: number;
}

const WaveformVisualizer = ({
  className,
  color = 'rgba(0, 0, 0, 0.2)',
  progressColor = 'rgba(0, 0, 0, 0.5)',
  currentTime,
  duration,
}: WaveformVisualizerProps) => {
  const currentTrack = useAudioStore((state) => state.getCurrentTrack());
  const audioUrl = getAudioFile(currentTrack?.audioFile);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!audioUrl) return;

    const fetchAudioData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new window.AudioContext();

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const channelData = audioBuffer.getChannelData(0);

        const points = 100;
        const blockSize = Math.floor(channelData.length / points);
        const downsampled = [];

        for (let i = 0; i < points; i++) {
          const blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channelData[blockStart + j] || 0);
          }
          downsampled.push(sum / blockSize);
        }

        const maxValue = Math.max(...downsampled);
        const normalized = downsampled.map((val) => val / maxValue);

        setWaveformData(normalized);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching or processing audio:', error);
        setIsLoading(false);
      }
    };

    fetchAudioData();
  }, [audioUrl]);

  useEffect(() => {
    if (!canvasRef.current || waveformData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / waveformData.length;
    const barMargin = 1;
    const progressPosition =
      duration > 0 ? (currentTime / duration) * canvas.width : 0;

    waveformData.forEach((value, index) => {
      const x = index * barWidth;
      const barHeight = value * canvas.height * 0.8; // 80% of canvas height max

      const isBeforeProgress = x < progressPosition;

      ctx.fillStyle = isBeforeProgress ? progressColor : color;

      const y = (canvas.height - barHeight) / 2;
      ctx.fillRect(x + barMargin / 2, y, barWidth - barMargin, barHeight);
    });
  }, [waveformData, currentTime, duration, color, progressColor]);

  return (
    <div className={cn('w-full h-8', className)}>
      {isLoading ? (
        <div className="absolute flex items-center justify-center">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gray-400 animate-pulse rounded-full"></div>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute w-[98%] h-full"
          width={510}
          height={40}
        />
      )}
    </div>
  );
};

export default WaveformVisualizer;
