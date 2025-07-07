'use client'

import React, { useEffect, useState } from 'react';

const ProductReviewModal = ({ onClose, onContinue, productData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayData = (productData?.products || productData || []).slice(0, 5);

  const handleDownloadExcel = async () => {
    setIsDownloading(true);
    setDownloadError('');

    try {
      // Use the saved Excel blob instead of making new API call
      const excelBlob = productData?.excelBlob;
      const fileName = productData?.excelFileName || 'result.xlsx';
      
      if (!excelBlob) {
        throw new Error('Excel faylı tapılmadı');
      }
      
      console.log('Downloading saved Excel file:', fileName, 'Size:', excelBlob.size);
      
      if (excelBlob.size > 0) {
        // Create download link and trigger download
        const url = window.URL.createObjectURL(excelBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Continue to next step after successful download
        onContinue();
      } else {
        throw new Error('Excel faylı boşdur');
      }
      
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError(error.message || 'Excel faylı yüklənərkən xəta baş verdi');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-lg  bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-[#101827] rounded-3xl shadow-xl w-[90%]  max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-0">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Məhsullara nəzər yetirin
          </h2>
        </div>
        
        <div className="px-6  overflow-y-auto max-h-[calc(90vh-120px)] ">
          <div className=" rounded-lg overflow-hidden bg-[#101827]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      №
                    </th> 
                    <th className="px-4 py-3  text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Sorğu Adı
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Miqdar
                    </th>
                    <th className="px-4 py-3  text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Uyğun Gələn Məhsullar
                    </th>
                    <th className="px-4 py-3  text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Orta Qiymət (₼)
                    </th>
                    <th className="px-0 py-3  text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Median Qiymət (₼)
                    </th>
                    <th className="px-2 py-3  text-xs font-medium text-white uppercase tracking-wider border-b text-center">
                      Cəm (₼)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.length > 0 ? (
                    displayData.map((item, index) => (
                      <tr key={item.id} className="bg-white ">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity || item.volume || ''}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs text-left">
                          <div 
                            className="font-medium overflow-hidden text-ellipsis" 
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.2em',
                              maxHeight: '2.4em'
                            }}
                          >
                            {item.queryName || item.name || ''}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                          <div 
                            className="text-xs overflow-hidden text-ellipsis" 
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.2em',
                              maxHeight: '2.4em'
                            }}
                          >
                            {item.matchingProducts || item.description || ''}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.averagePrice || item.price || ''}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.medianPrice || ''}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.total || ''}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        Məlumat yoxdur
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {downloadError && (
          <div className="px-6 pb-4 bg-[#101827]">
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {downloadError}
            </div>
          </div>
        )}
        
        <div className="px-6 py-[30px] bg-[#101827] flex justify-center">
          <button
            onClick={handleDownloadExcel}
            disabled={isDownloading}
            className="bg-[#F37321] cursor-pointer hover:bg-[#E55A00] disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-bold py-2 px-[40px] rounded-4xl text-lg transition-colors duration-200 w-[200px]"
          >
            {isDownloading ? 'Yüklənir...' : 'Davam et'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewModal; 