import React from 'react';
import { IoClose } from 'react-icons/io5';

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-lg">
      <div 
        className="absolute inset-0 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-[90%] max-w-4xl mx-auto rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-40"
        >
          <IoClose size={32} />
        </button>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/qlhKvQ_oM4k?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 