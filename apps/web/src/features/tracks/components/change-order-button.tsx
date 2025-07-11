import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search';

const ChangeOrderButton = () => {
  const {
    state: { order },
    actions: { setOrder },
  } = useTracksSearch();

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
