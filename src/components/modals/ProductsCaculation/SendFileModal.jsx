'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const SendFileModal = ({ onClose, uploadedFiles, setUploadedFiles, onOpenPlanPayment }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
      status: 'done', 
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: true,
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + "y ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    return Math.floor(seconds) + "s ago";
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadClick = () => {
    if (uploadedFiles.length > 0) {
      onClose();
      onOpenPlanPayment();
    } else {
      console.log('Download sample file');
    }
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-lg bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-[#101827] p-8 rounded-3xl shadow-xl w-full max-w-md min-w-[350px] md:min-w-[600px] mx-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-[32px] font-semibold mb-6 text-center">Faylı göndərin</h2>
        <div
          {...getRootProps()}
          className="border-2 border-dashed flex flex-col justify-center items-center border-orange-500 rounded-xl p-8 text-center cursor-pointer mb-6 h-[260px] bg-white"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-[#F37321] text-[24px] font-semibold">Faylı buraya buraxın...</p>
          ) : (
            <div className='my-[30px] flex flex-col items-center'>
              <img src="/assets/icons/cloud.svg" alt="cloud" className='w-[100px] h-[100px]' />
              <p className="text-[#868686] text-[24px] font-semibold">Faylınızı sürükləyin<br/>və ya<br/>
              <span className="text-[#F37321] font-semibold">Faylları gözdən keçirin</span></p>
            </div>
          )}
        </div>

        <p className="text-[#fff] text-[16px] mb-6 text-left">Dəstəklənən fayl tipi: .xls .xlsx</p>

        <div className="flex items-center bg-[#fff] px-3 py-3 rounded-xl mb-6 overflow-hidden ">
          <img src="/assets/icons/excel.svg" alt="excel" className='w-[32px] h-[32px] mr-3' />
          <span className='text-[14px] text-[#686868] w-full'>Nümunə faylını endirərək məhsullarınızı əlavə edin</span>
        </div>

        <div className="mb-6 max-h-48 overflow-y-auto">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-start md:items-center flex-col md:flex-row justify-between py-3 mb-2">
              <div className="flex items-center">
                {file.status === 'done' && <img src="/assets/icons/done.svg" alt="done" className='w-[24px] h-[24px] mr-3' /> }
                <span className="text-white font-medium">{file.name}</span>
                <span className='text-gray-400 text-sm pl-[20px]'>({formatFileSize(file.size)})</span>
              </div>
              <div className="text-gray-400 text-sm pl-[20px]">
                <span className="ml-4">{formatTimeAgo(new Date(file.uploadedAt))}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between space-x-4">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-3xl w-[200px]">
            Göndər
          </button>
          <button
            onClick={handleDownloadClick}
            className="border border-gray-500 bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-3xl w-[200px]"
          >
            {uploadedFiles.length > 0 ? 'Davam et' : 'Endir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendFileModal; 