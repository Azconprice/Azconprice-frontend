"use client";

import { useState, useEffect } from "react";
import AppAccordion from './AppAccordion';

const Applications = ({ initialData }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (!initialData || !initialData.items) {
        setApplications([]);
        return;
      }

      const formattedApplications = initialData.items.map(app => ({
        id: app.id,
        type: app.type || "Müraciət",
        date: new Date(app.createdTime).toLocaleDateString('az-AZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        content: app.note || 'Məlumat yoxdur',
        fullName: app.fullName,
        phoneNumber: app.phoneNumber,
        email: app.email,
        isExpandedByDefault: false
      }));
      
      if (formattedApplications.length > 0) {
        formattedApplications[0].isExpandedByDefault = true;
      }
      
      setApplications(formattedApplications);
    } catch (err) {
      console.error('Error processing applications data:', err);
      setError('Məlumatları emal edərkən xəta baş verdi');
    }
  }, [initialData]);

  if (error) {
    return (
      <div className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
      <div className="rounded-[20px] p-[20px]">
        {applications.length > 0 ? (
          applications.map((application) => (
            <AppAccordion
              key={application.id}
              type={application.type}
              date={application.date}
              content={application.content}
              isExpandedByDefault={application.isExpandedByDefault}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Hələ ki müraciətiniz yoxdur</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
