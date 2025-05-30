import React, { useEffect, useState, useRef } from 'react';
import tmdbApi from '../api/tmdbApi';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import TrailerModal from './TrailerModal';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const [movies, setMovies] = useState([]); // Lưu trữ danh sách phim
  const [currentIndex, setCurrentIndex] = useState(0);  // Chỉ số phim hiện tại
  const intervalRef = useRef(null); // Lưu trữ interval để tự động chuyển phim
  const [direction, setDirection] = useState(0); // Hướng chuyển động (0: không chuyển, 1: sang phải, -1: sang trái)
  const bannerRef = useRef(null); // Tham chiếu đến phần tử banner
  const [trailerKey, setTrailerKey] = useState(null); // Lưu trữ khóa trailer đang xem
  const navigate = useNavigate(); // Dùng để điều hướng đến trang chi tiết phim

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trending = await tmdbApi.getTrendingMovies();
        // setMovies(trending.slice(0, 10));
        const shuffled = trending.sort(() => 0.5 - Math.random()); // trộn danh sách
        setMovies(shuffled.slice(0, 10)); // chọn 10 phim ngẫu nhiên
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrending(); 
  }, []);

  // Hàm start/stop interval riêng biệt
  const startAutoSlide = () => {
    clearInterval(intervalRef.current); // Dừng interval cũ nếu có
    intervalRef.current = setInterval(() => {
      handleNext(true); // Tự động chuyển sang phim tiếp theo
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current); // Dừng interval khi không cần thiết
  };

  useEffect(() => {
    if (movies.length === 0 || trailerKey) return; // Dừng nếu đang xem trailer
    startAutoSlide();
    return () => stopAutoSlide();
  }, [movies, currentIndex, trailerKey]); // theo dõi thêm trailerKey

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

  const movie = movies[currentIndex]; // Lấy phim hiện tại dựa trên chỉ số
  if (!movie) return null;

  const handleWatchTrailer = async () => {
    try {
        const videos = await tmdbApi.getMovieVideos(movie.id); // Lấy danh sách video của phim
        const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube'); // Tìm trailer chính thức
        if (trailer) {
        setTrailerKey(trailer.key); // Lưu khóa trailer để mở modal
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