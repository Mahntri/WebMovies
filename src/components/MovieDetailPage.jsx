import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdbApi from '../api/tmdbApi';
import { PlayCircleOutlined } from '@ant-design/icons';


const MovieDetailPage = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    setMovie(null);
    const fetchData = async () => {
      try {
        const detail = await tmdbApi.getDetail(type, id);
        const credits = await tmdbApi.getCredits(type, id);
        const videoList = await tmdbApi.getVideos(type, id);
        const similarList = await tmdbApi.getSimilar(type, id);

        setMovie(detail);
        setCasts(credits.cast.slice(0, 6));
        setVideos(videoList);
        setSimilar(similarList.slice(0, 10));
      } catch (err) {
        console.error('Failed to fetch detail:', err);
      }
    };

    fetchData();
  }, [id, type]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  const trailer =
  videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
  videos.find(v => v.type === 'Teaser' && v.site === 'YouTube');
  const title = movie.title || movie.name;

  return (
    <div className="text-white">
      {/* Banner */}
      <div
        className="relative w-full min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col md:flex-row px-6 py-10">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            className="rounded-xl shadow-lg mb-6 md:mb-0 md:mr-10 w-52"
            alt={title}
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map(g => (
                <span key={g.id} className="px-3 py-1 bg-white bg-opacity-10 rounded-full">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="text-base leading-relaxed max-w-2xl">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Casts */}
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Casts</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {casts.map(cast => (
            <div key={cast.id} className="flex flex-col items-center text-center w-24">
              <img
                src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                alt={cast.name}
                className="rounded-full w-20 h-20 object-cover mb-2"
              />
              <p className="text-sm">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer */}
      {trailer ? (
        <div className="max-w-screen-xl mx-auto px-6 pb-10">
          <h2 className="text-2xl font-semibold mb-4">International Trailer</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto px-6 pb-10 text-center text-gray-400">
          <p>No trailer available for this title.</p>
        </div>
      )}

      {/* Similar */}
      <div className="max-w-screen-xl mx-auto px-6 pb-10">
        <h2 className="text-2xl font-semibold mb-4">Similar</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {similar.map(item => (
            <div
              key={item.id}
              className="w-32 flex-shrink-0 cursor-pointer group"
              onClick={() => navigate(`/${type}/${item.id}`)}
            >
              <div className="relative w-32 h-48 rounded-lg overflow-hidden mb-2">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  className="w-full h-full object-cover transition group-hover:brightness-50"
                  alt={item.title || item.name}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleOutlined style={{ fontSize: 32, color: 'white' }} />
                </div>
              </div>
              <p className="text-sm truncate w-32 group-hover:text-red-500 transition">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;