import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAnimeSearch = (query, page) => {
  return useQuery({
    queryKey: ['animeSearch', query, page],
    queryFn: async () => {
      const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&page=${page}`);
      return res.data;
    },
    enabled: !!query,
  });
};