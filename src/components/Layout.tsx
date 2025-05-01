
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
