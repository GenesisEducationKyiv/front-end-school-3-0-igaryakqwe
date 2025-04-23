import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label.tsx';
import ChangeOrderButton from '@/features/tracks/components/change-order-button.tsx';
import GenresCombobox from '@/features/tracks/components/genres-combobox.tsx';
import SortCombobox from '@/features/tracks/components/sort-combobox.tsx';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search.ts';

const TracksFilters = () => {
  const { search, setSearch, artist, setArtist, album, setAlbum } =
    useTracksSearch();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setSearch(e.target.value);
  };

  const handleArtistChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setArtist(e.target.value);
  };

  const handleAlbumChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setAlbum(e.target.value);
  };

  return (
    <Card className="w-full lg:w-1/3 p-5 h-fit">
      <CardTitle className="text-2xl">Filters</CardTitle>
      <CardContent className="p-0 space-y-2">
        <Input
          data-testid="search-input"
          label="Search"
          value={search}
          placeholder="Enter title..."
          onChange={handleSearchChange}
        />
        <Input
          data-testid="filter-artist"
          label="Artist"
          value={artist}
          placeholder="Enter artist..."
          onChange={handleArtistChange}
        />
        <Input
          data-testid="filter-album"
          label="Album"
          value={album}
          placeholder="Enter album..."
          onChange={handleAlbumChange}
        />
        <div>
          <Label className="text-sm font-medium">Select Genre</Label>
          <GenresCombobox />
        </div>
        <div className="flex items-end w-full gap-2">
          <div className="w-full">
            <Label className="text-sm font-medium">Sort By</Label>
            <SortCombobox />
          </div>
          <ChangeOrderButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default TracksFilters;
