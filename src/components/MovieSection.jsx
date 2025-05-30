import React from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MovieSection = ({ title, movies }) => (
  <div className="section mb-12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <Link
        to={title.toLowerCase().includes('movie') ? "/movie" : "/tv"}
        className="view-more-btn text-white font-semibold hover:text-red-500 border-2 border-gray-500 hover:border-red-500 px-6 py-1 rounded-full transition-all duration-300"
      >
        View more
      </Link>
    </div>

    <div className="movie-row flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
      {movies.map((item, i) => (
        <MovieCard
          key={item.id}
          movie={item.title || null}
          tv={item.name || null}
          img={item.poster_path}
          id={item.id}
        />
      ))}
    </div>
  </div>
);

export default MovieSection;