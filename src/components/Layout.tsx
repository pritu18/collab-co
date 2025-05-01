
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
