import axios from "axios";
import { apiKey } from "../constants";
import { Path } from "react-native-svg";

const BASE_URL = 'https://api.themoviedb.org/3';

const trandingMoviesEndpoint = `${BASE_URL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${BASE_URL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${BASE_URL}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${BASE_URL}/search/movie?api_key=${apiKey}`;     //&query=${query}

const movieDetailsEndpoint = id => `${BASE_URL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${BASE_URL}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailEndpoint = id => `${BASE_URL}/person/${id}?api_key=${apiKey}`;
const personMovieEndpoint = id => `${BASE_URL}/person/${id}/movie_credits?api_key=${apiKey}`;

// export const image342 = path =>     typeof path === 'string' ? `https://image.tmdb.org/t/p/w342${path}` : '';
export const image342 = path => {
  if (!path || typeof path !== 'string') return '';
  return `https://image.tmdb.org/t/p/w342${path}`;
};

export const image500 = path =>     typeof path === 'string' ? `https://image.tmdb.org/t/p/w500${path}` : '';
export const image185 = path =>     typeof path === 'string' ? `https://image.tmdb.org/t/p/w185${path}` : '';

export const fallbackMoviePoster  = require('../theme/image/no-photo.png');
export const fallbackPersonPoster = require('../theme/image/character.png');

const apiCall = async (endpoint, params) => {
    const option = {
        method: 'GET',
        url: endpoint,
        params: params? params : {},
    };

    try {
        const response = await axios.request(option);
        return response.data;
    }
    catch (error) {
        console.error('API call error: ', error);
        throw error;
        // return{}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trandingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}


export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = async (id) => {
    const response = await apiCall(movieCreditsEndpoint(id));
    return response?.cast; // ⬅️ ONLY cast return karo
}
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}


export const fetchpersonDetail = (id) => {
    return apiCall(personDetailEndpoint(id));
}
export const fetchpersonMovie = (id) => {
    return apiCall(personMovieEndpoint(id));
}

export const searchMovie = params => {
    return apiCall(searchMoviesEndpoint, params);
}