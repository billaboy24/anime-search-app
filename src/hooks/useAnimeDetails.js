import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAnimeDetails = (id) => {
  return useQuery({
    queryKey: ['animeDetails', id],
    queryFn: async () => {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      return res.data.data;
    }
  });
};