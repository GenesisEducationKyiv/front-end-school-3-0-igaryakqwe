import { Button } from '@/components/ui/button.tsx';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search.ts';
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from 'lucide-react';

const ChangeOrderButton = () => {
  const { order, setOrder } = useTracksSearch();

  const handleChangeOrder = async () => {
    await setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Button size="icon" variant="outline" onClick={handleChangeOrder}>
      {order === 'asc' ? (
        <ArrowDownWideNarrowIcon className="h-4 w-4" />
      ) : (
        <ArrowUpWideNarrowIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ChangeOrderButton;
