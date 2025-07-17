import { Card, CardTitle } from '@/components/ui/card';

const EmptyTrackListCard = () => {
  return (
    <Card
      data-testid="empty-tracks-list"
      className="w-full h-full flex-1 grid place-items-center"
    >
      <CardTitle>No tracks found</CardTitle>
    </Card>
  );
};

export default EmptyTrackListCard;
