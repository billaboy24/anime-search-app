// src/hooks/useInitialAnime.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopAnime = async ({ queryKey }) => {
  const [, page] = queryKey;
  const res = await axios.get(`https://api.jikan.moe/v4/top/anime`, {
    params: { filter: "airing", page },
  });
  return res.data;
};

export const useInitialAnime = (page) => {
  return useQuery({
    queryKey: ["initialAnime", page],
    queryFn: fetchTopAnime,
    staleTime: 1000 * 60 * 5,
  });
};
