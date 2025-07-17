import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { formatDate } from '@/utils/date.utils';

interface TrackMetadataProps {
  createdAt: string;
  updatedAt?: string;
  id: string;
  slug: string;
}

const TrackMetadata = ({
  updatedAt,
  createdAt,
  id,
  slug,
}: TrackMetadataProps) => {
  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="font-semibold">Track Details</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Created: {formatDate(createdAt)}</span>
          </div>
          {updatedAt && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Updated: {formatDate(updatedAt)}</span>
            </div>
          )}
          <div>
            <span>ID: {id}</span>
          </div>
          <div>
            <span>Slug: {slug}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackMetadata;
