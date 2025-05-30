import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="pt-20">
      <div
        className="bg-black text-white py-10"
        style={{
          backgroundImage: "url('/footer.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-screen-lg mx-auto flex flex-col items-center">
          {/* Logo phần footer */}
          <div className="flex items-center mb-6">
            <span className="text-green-500 text-3xl mr-2">
              <Link to="/" className="hover:text-red-500">MoiMovies</Link>
            </span>
          </div>

          {/* Các liên kết chính */}
          <div className="flex justify-center space-x-5 mb-6">
            <Link to="/" className="hover:text-red-500">Live</Link>
            <Link to="/" className="hover:text-red-500">FAQ</Link>
            <Link to="/" className="hover:text-red-500">Premium</Link>
            <Link to="/" className="hover:text-red-500">Privacy policy</Link>
          </div>

          {/* Các liên kết thông tin */}
          <div className="text-center mb-6">
            <p>Contact us | Term of services | About us</p>
          </div>

          {/* Các liên kết xem phim */}
          <div className="flex justify-center space-x-12">
            <Link to="/" className="hover:text-red-500">Recent releases</Link>
            <Link to="/" className="hover:text-red-500">Top IMDb</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;