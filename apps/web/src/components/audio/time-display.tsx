import { memo } from 'react';

import { formatTime } from '@/utils/date.utils';

interface TimeDisplayProps {
  time: number;
}

const TimeDisplay = memo(({ time }: TimeDisplayProps) => (
  <span className="text-xs font-mono w-12 text-slate-500">
    {formatTime(time)}
  </span>
));

TimeDisplay.displayName = 'TimeDisplay';

export default TimeDisplay;
