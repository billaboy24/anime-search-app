import React, { useState } from 'react';
import { Box, Grid, TextField, Pagination, Typography, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../utils/useDebounce';
import { useAnimeSearch } from '../hooks/useAnimeSearch';
import AnimeCard from '../components/AnimeCard';

const Home = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 250);
  const { data, isLoading, isError, error } = useAnimeSearch(debouncedSearch, page);

  return (
    <Box mt={4}>
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold">Discover Anime</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Search your favorite anime powered by Jikan API
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Search Anime"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {isLoading && (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {isError && <Typography mt={2} color="error">{error.message}</Typography>}

      <Grid container spacing={3} mt={2}>
        {data?.data?.length > 0 ? (
          data.data.map((anime) => (
            <Grid item xs={12} sm={6} md={4} key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </Grid>
          ))
        ) : !isLoading && (
          <Box mt={4} textAlign="center" width="100%">
            <Typography>No results found.</Typography>
          </Box>
        )}
      </Grid>

      {data?.pagination?.last_visible_page > 1 && (
        <Box mt={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <Pagination
            count={data.pagination.last_visible_page}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
          <Typography mt={1}>Page {page} of {data.pagination.last_visible_page}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;