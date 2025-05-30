import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';

const MovieCard = ({ movie, tv, img, id }) => {
  const navigate = useNavigate(); // Dùng để điều hướng đến trang chi tiết phim
  const title = movie || tv; // Tên phim hoặc series
  const path = movie ? `/movie/${id}` : `/tv/${id}`; // Đường dẫn đến trang chi tiết phim hoặc series

  return (
    <div
      onClick={() => navigate(path)}
      className="movie-card flex flex-col items-center w-32 cursor-pointer group hover:text-red-500"
    >
      {/* Bộ phim */}
      <div className="relative w-32 h-48 rounded-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${img}`}
          alt={title}
          className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
        />

        {/* Icon play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircleOutlined style={{ fontSize: 40, color: 'white' }} />
        </div>
      </div>

      {/* Tên phim */}
      <p className="text-center text-xs truncate w-full mt-2 group-hover:text-red-500 transition">
        {title}
      </p>
    </div>
  );
};

export default MovieCard;