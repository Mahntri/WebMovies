import React from 'react';
import { CloseOutlined } from '@ant-design/icons';


const TrailerModal = ({ videoKey, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-500"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;