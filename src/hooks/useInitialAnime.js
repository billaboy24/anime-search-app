// src/hooks/useInitialAnime.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopAnime = async () => {
  const res = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=airing"
  );
  return res.data;
};

export const useInitialAnime = () => {
  return useQuery({
    queryKey: ["initialAnime"],
    queryFn: fetchTopAnime,
    staleTime: 1000 * 60 * 5,
  });
};
