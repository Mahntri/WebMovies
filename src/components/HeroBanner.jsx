import React, { useEffect, useState, useRef } from 'react';
import tmdbApi from '../api/tmdbApi';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import TrailerModal from './TrailerModal';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [direction, setDirection] = useState(0);
  const bannerRef = useRef(null);
  const [trailerKey, setTrailerKey] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trending = await tmdbApi.getTrendingMovies();
        // setMovies(trending.slice(0, 10));
        const shuffled = trending.sort(() => 0.5 - Math.random());
        setMovies(shuffled.slice(0, 10));
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrending(); 
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext(true);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (movies.length === 0 || trailerKey) return;
    startAutoSlide();
    return () => stopAutoSlide();
  }, [movies, currentIndex, trailerKey]);

  const handleNext = (auto = false) => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1 
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  const movie = movies[currentIndex];
  if (!movie) return null;

  const handleWatchTrailer = async () => {
    try {
        const videos = await tmdbApi.getMovieVideos(movie.id);
        const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
        setTrailerKey(trailer.key);
        } else {
        alert('Trailer not available');
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div
      ref={bannerRef}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      className="relative w-full h-[500px] rounded-lg overflow-hidden text-white mb-10"
    >
      {/* Nút điều hướng */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full z-20"
      >
        <LeftOutlined style={{ fontSize: '20px' }} />
      </button>
      <button
        onClick={() => handleNext(false)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full z-20"
      >
        <RightOutlined style={{ fontSize: '20px' }} />
      </button>

      {/* Hiệu ứng Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 max-w-screen-lg mx-auto h-full flex flex-col justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title || movie.name} 
            </h1> 
            <p className="text-base md:text-lg max-w-2xl mb-6 line-clamp-4">
              {movie.overview}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition">
                Watch now
              </button>
              <button 
                onClick={handleWatchTrailer}
                className="border border-white hover:bg-white hover:text-black px-6 py-2 rounded-full font-semibold transition">
                    Watch trailer
              </button>
              {trailerKey && (
                <TrailerModal
                    videoKey={trailerKey}
                    onClose={() => setTrailerKey(null)}
                />
                )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroBanner;