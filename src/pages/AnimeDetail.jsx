import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimeDetails } from '../hooks/useAnimeDetails';
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Chip,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useAnimeDetails(id);

  if (isLoading) {
    return <Box mt={4} textAlign="center"><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <Box mt={4}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Back to Search
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={data.images?.jpg?.large_image_url}
            alt={data.title}
            style={{ width: '100%', borderRadius: 10 }}
          />
          {data.trailer?.embed_url && (
            <Box mt={2}>
              <Button
                href={data.trailer.url}
                target="_blank"
                variant="contained"
                fullWidth
              >
                Watch Trailer
              </Button>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{data.title}</Typography>
          <Chip label={data.status} color="primary" sx={{ mr: 1 }} />
          <Chip label={`${data.episodes} episodes`} sx={{ mr: 1 }} />
          <Chip label={`Score: ${data.score || 'N/A'}`} sx={{ mr: 1 }} />

          <Typography variant="body1" mt={2}>{data.synopsis}</Typography>

          <Box mt={2}>
            <Typography><strong>Type:</strong> {data.type}</Typography>
            <Typography><strong>Year:</strong> {data.year || 'N/A'}</Typography>
            <Typography><strong>Studio:</strong> {data.studios?.[0]?.name || 'Unknown'}</Typography>
            <Typography><strong>Aired:</strong> {data.aired?.string}</Typography>
          </Box>

          <Box mt={2}>
            {data.genres?.map((genre) => (
              <Chip key={genre.mal_id} label={genre.name} sx={{ mr: 1, mt: 1 }} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimeDetail;