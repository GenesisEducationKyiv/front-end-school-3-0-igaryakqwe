import useTracksSearch from '@/features/tracks/hooks/use-tracks-search';

const useTrackFiltersConfigs = () => {
  const { state, actions } = useTracksSearch();

  const { search, artist, album } = state;
  const { setSearch, setArtist, setAlbum } = actions;

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setSearch(e.target.value);
  };

  const handleArtistChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setArtist(e.target.value);
  };

  const handleAlbumChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setAlbum(e.target.value);
  };

  const inputConfigs = [
    {
      label: 'Search',
      value: search,
      placeholder: 'Enter title...',
      onChange: handleSearchChange,
      testId: 'search-input',
    },
    {
      label: 'Artist',
      value: artist,
      placeholder: 'Enter artist...',
      onChange: handleArtistChange,
      testId: 'filter-artist',
    },
    {
      label: 'Album',
      value: album,
      placeholder: 'Enter album...',
      onChange: handleAlbumChange,
      testId: 'filter-album',
    },
  ];

  return inputConfigs;
};

export default useTrackFiltersConfigs;
