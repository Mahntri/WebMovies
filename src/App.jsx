import React, { useEffect, useState } from 'react';
import MovieSection from './components/MovieSection';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import SeriesList from './components/SeriesList';
import HeroBanner from './components/HeroBanner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import tmdbApi from './api/tmdbApi';
import MovieDetailPage from './components/MovieDetailPage';

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTrendingMovies(await tmdbApi.getTrendingMovies());
      setTopRatedMovies(await tmdbApi.getTopRatedMovies());
      setTrendingTV(await tmdbApi.getTrendingTV());
      setTopRatedTV(await tmdbApi.getTopRatedTV());
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="bg-black min-h-screen px-6">
        <div className="max-w-screen-lg mx-auto pt-24">
          <Header />
          <Routes>
            <Route path="/movie/:id" element={<MovieDetailPage type="movie" />} />
            <Route path="/tv/:id" element={<MovieDetailPage type="tv" />} />
            <Route
                path="/"
                element={
                  <>
                    <HeroBanner />
                    <MovieSection title="Trending movies" movies={trendingMovies} />
                    <MovieSection title="Top rated movies" movies={topRatedMovies} />
                    <MovieSection title="Trending TV" movies={trendingTV} />
                    <MovieSection title="Top rated TV" movies={topRatedTV} />
                  </>
                }
              />
            <Route
              path="/"
              element={
                <>
                  <MovieSection title="Trending movies" movies={trendingMovies} />
                  <MovieSection title="Top rated movies" movies={topRatedMovies} />
                  <MovieSection title="Trending TV" movies={trendingTV} />
                  <MovieSection title="Top rated TV" movies={topRatedTV} />
                </>
              }
            />
            <Route path="/movie" element={<MovieList movies={trendingMovies.concat(topRatedMovies)} />} />
            <Route path="/tv" element={<SeriesList series={trendingTV.concat(topRatedTV)} />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;