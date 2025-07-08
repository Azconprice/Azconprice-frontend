'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const SendFileModal = ({ onClose, uploadedFiles, setUploadedFiles, onOpenPlanPayment, onOpenProductReview }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [originalFiles, setOriginalFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedExcelBlob, setSavedExcelBlob] = useState(null);
  const [savedExcelFileName, setSavedExcelFileName] = useState(null);
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
      originalFile: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setOriginalFiles(prev => [...prev, ...acceptedFiles]);
    setUploadError('');
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
    if (processedData) {
      onClose();
      // Pass the product data and Excel blob to ProductReviewModal
      onOpenProductReview({
        products: processedData.products || [],
        excelBlob: processedData.excelBlob,
        excelFileName: processedData.excelFileName
      });
    } else {
      console.log('Download sample file');
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/shablon.xlsx';
    link.download = 'shablon.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadExcel = async () => {
    if (uploadedFiles.length === 0) {
      setUploadError('Zəhmət olmasa fayl seçin');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      
      uploadedFiles.forEach((file, index) => {
        if (file.originalFile) {
          formData.append('File', file.originalFile);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Excel/upload?IsSimple=true`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Fayl yüklənmədi');
      }

      // Check if response is Excel file (binary) or JSON
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response
        const result = await response.json();
        setProcessedData(result);
      } else {
        // Handle Excel file response - save Excel and parse data
        const blob = await response.blob();
        const fileName = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'processed_file.xlsx';
        
        // Save the Excel blob and filename for later download
        setSavedExcelBlob(blob);
        setSavedExcelFileName(fileName);
        
        // Parse Excel file to extract data for ProductReviewModal
        try {
          setIsProcessing(true);
          const arrayBuffer = await blob.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Debug: Log the Excel data structure
          console.log('Excel jsonData:', jsonData);
          console.log('First row (headers):', jsonData[0]);
          console.log('Second row (first data):', jsonData[1]);
          console.log('Third row (second data):', jsonData[2]);
          
          // Try using headers for better mapping
          const headers = jsonData[0] || [];
          console.log('Headers:', headers);
          
          // Find column indices based on header names
          const columnMap = {
            queryName: headers.findIndex(h => h && (h.includes('Sorğu') || h.includes('Adı'))),
            quantity: headers.findIndex(h => h && h.includes('Miqdar')),
            matchingProducts: headers.findIndex(h => h && (h.includes('Uyğun') || h.includes('Məhsul'))),
            averagePrice: headers.findIndex(h => h && (h.includes('Orta') || h.includes('Qiymət'))),
            medianPrice: headers.findIndex(h => h && h.includes('Median')),
            total: headers.findIndex(h => h && h.includes('Cəm'))
          };
          
          console.log('Column mapping:', columnMap);
          
          // Process the Excel data using column mapping
          const processedRows = jsonData.slice(1).map((row, index) => {
            console.log(`Row ${index + 1}:`, row);
            if (!row || row.length === 0) return null;
            
            return {
              id: index + 1,
              queryName: (columnMap.queryName >= 0 ? row[columnMap.queryName] : row[0]) || '',
              quantity: (columnMap.quantity >= 0 ? row[columnMap.quantity] : row[1]) || '',
              matchingProducts: (columnMap.matchingProducts >= 0 ? row[columnMap.matchingProducts] : row[2]) || '',
              averagePrice: (columnMap.averagePrice >= 0 ? row[columnMap.averagePrice] : row[3]) || '',
              medianPrice: (columnMap.medianPrice >= 0 ? row[columnMap.medianPrice] : row[4]) || '',
              total: (columnMap.total >= 0 ? row[columnMap.total] : row[5]) || ''
            };
          }).filter(row => row !== null);
          
          console.log('Processed rows:', processedRows);
          
          setProcessedData({
            products: processedRows,
            fileName: fileName,
            status: 'success',
            excelBlob: blob,
            excelFileName: fileName
          });
        } catch (parseError) {
          console.error('Excel parsing error:', parseError);
          setUploadError('Excel faylı oxunarkən xəta baş verdi');
        } finally {
          setIsProcessing(false);
        }
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Fayl yüklənərkən xəta baş verdi');
    } finally {
      setIsUploading(false);
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

        <div className="flex items-center bg-[#fff] px-3 justify-between py-3 rounded-xl mb-6 overflow-hidden ">
          <div className='flex items-center'>

         
          <img src="/assets/icons/excel.svg" alt="excel" className='w-[32px] h-[32px] mr-3' />
          <span className='text-[14px] text-[#686868] w-full'>Nümunə faylını endirərək məhsullarınızı əlavə edin</span>
         
          </div>
           <button 
            onClick={handleDownloadTemplate}
            className="border border-gray-500 cursor-pointer hover:bg-gray-200 text-black font-bold py-2 px-2 rounded-3xl w-[100px]"
          >
            Endir
          </button>
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

        {uploadError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {uploadError}
          </div>
        )}

        {isProcessing && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            Excel faylı işlənilir...
          </div>
        )}

        <div className="flex justify-between space-x-4">
          <button 
            onClick={handleUploadExcel}
            disabled={isUploading || uploadedFiles.length === 0}
            className="bg-orange-600 cursor-pointer hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-3xl w-[200px]"
          >
            {isUploading ? 'Göndərilir...' : 'Göndər'}
          </button>
          <button
            onClick={handleDownloadClick}
            disabled={isProcessing}
            className="border cursor-pointer border-gray-500 bg-transparent hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-3xl w-[200px]"
          >
            {isProcessing ? 'İşlənilir...' : processedData ? 'Davam et' : 'Endir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendFileModal; 