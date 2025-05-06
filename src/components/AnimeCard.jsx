import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      sx={{ borderRadius: 3, height: "100%", width: "250px" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={anime.images?.jpg?.image_url}
          alt={anime.title}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {anime.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
