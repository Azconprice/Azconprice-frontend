import Header from "@/components/profile/Header";
import Sidebar from "@/components/profile/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
};

export default layout;
