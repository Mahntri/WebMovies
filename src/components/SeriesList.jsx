import React, { useEffect, useState } from 'react';
import tmdbApi from '../api/tmdbApi';
import MovieCard from './MovieCard';

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSeries = async (nextPage = 1) => {
    setLoading(true);
    const newSeries = await tmdbApi.getTrendingTV(nextPage);
    setSeries(prev => [...prev, ...newSeries]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const unique = Array.from(new Map(series.map(m => [m.id, m])).values());
  const filtered = unique.filter(series => {
    const name = series.title || series.name || '';
    return name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="text-white pt-20">
      <h2 className="text-3xl font-bold text-center mb-8">TV Series</h2>

      {/* Tìm kiếm */}
      <div className="flex mb-8">
        <input
          type="text"
          placeholder="Enter keyword"
          className="px-4 py-2 w-64 rounded-l-full bg-gray-800 text-white border border-gray-600 focus:outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="px-5 py-2 bg-red-600 text-white rounded-r-full hover:bg-red-700">
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {filtered.map((item) => (
          <MovieCard
            key={item.id}
            movie={item.title || null}
            tv={item.name || null}
            img={item.poster_path}
            id={item.id}
          />
        ))}
      </div>

      {/* Nút tải thêm */}

      {!loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesList;