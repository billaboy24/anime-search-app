import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../utils/useDebounce";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { useInitialAnime } from "../hooks/useInitialAnime";
import AnimeCard from "../components/AnimeCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 250);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useAnimeSearch(debouncedSearch, page);

  const {
    data: initialData,
    isLoading: isInitialLoading,
    isError: isInitialError,
    error: initialError,
  } = useInitialAnime(page);

  const showInitial = !debouncedSearch;

  const animeList = showInitial ? initialData?.data : searchData?.data;
  const pagination = showInitial
    ? initialData?.pagination
    : searchData?.pagination;

  const isLoading = showInitial ? isInitialLoading : isSearchLoading;
  const isError = showInitial ? isInitialError : isSearchError;
  const error = showInitial ? initialError : searchError;

  return (
    <Box mt={4}>
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold">
          Discover Anime
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Search your favorite anime powered by Jikan API
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Search Anime"
        variant="outlined"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
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

      {isError && (
        <Typography mt={2} color="error">
          {error?.message || "Something went wrong"}
        </Typography>
      )}

      <Grid container spacing={3} mt={2} justifyContent={"center"}>
        {animeList?.length > 0
          ? animeList.map((anime, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AnimeCard anime={anime} />
              </Grid>
            ))
          : !isLoading && (
              <Box mt={4} textAlign="center" width="100%">
                <Typography>No results found.</Typography>
              </Box>
            )}
      </Grid>

      {pagination?.last_visible_page > 1 && (
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          mb={4}
        >
          <Pagination
            count={pagination.last_visible_page}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
          <Typography mt={1}>
            Page {page} of {pagination.last_visible_page}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;
