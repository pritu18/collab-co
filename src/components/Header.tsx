
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-team-primary">STUDENT TEAM ORBIT</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-team-primary",
              isActive("/") ? "text-team-primary" : "text-gray-700"
            )}
          >
            Home
          </Link>
          <Link 
            to="/add-member"
            className={cn(
              "text-sm font-medium transition-colors hover:text-team-primary",
              isActive("/add-member") ? "text-team-primary" : "text-gray-700"
            )}
          >
            Add Member
          </Link>
          <Link 
            to="/view-members"
            className={cn(
              "text-sm font-medium transition-colors hover:text-team-primary",
              isActive("/view-members") ? "text-team-primary" : "text-gray-700"
            )}
          >
            View Members
          </Link>
        </nav>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <nav className="flex items-center space-x-4">
            <Link 
              to="/"
              className={cn(
                "p-1",
                isActive("/") ? "text-team-primary" : "text-gray-700"
              )}
            >
              Home
            </Link>
            <Link 
              to="/add-member"
              className={cn(
                "p-1",
                isActive("/add-member") ? "text-team-primary" : "text-gray-700"
              )}
            >
              Add
            </Link>
            <Link 
              to="/view-members"
              className={cn(
                "p-1",
                isActive("/view-members") ? "text-team-primary" : "text-gray-700"
              )}
            >
              Members
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
