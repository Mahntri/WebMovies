import axios from 'axios';

const API_KEY = '2ae6b8c15749d0c1d6c08479709405d0';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = {
  getTrendingMovies: async () => {
    const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.data.results;
  },

  getTopRatedMovies: async (page = 1) => {
    const res = await axios.get(`${BASE_URL}/movie/top_rated?page=${page}&api_key=${API_KEY}`);
    return res.data.results;
  },

  getTrendingTV: async (page = 1) => {
    const res = await axios.get(`${BASE_URL}/trending/tv/week?page=${page}&api_key=${API_KEY}`);
    return res.data.results;
  },

  getTopRatedTV: async () => {
    const response = await axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    return response.data.results;
  },
  getMovieVideos: async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    return response.data.results;
  },
  getDetail: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
    return res.data;
  },
  getCredits: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
    return res.data;
  },
  getVideos: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`);
    return res.data.results;
  },
  getSimilar: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`);
    return res.data.results;
  }
};

export default tmdbApi;