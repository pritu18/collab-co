
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-secondary shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
            <h1 className="text-xl font-bold text-team-primary">COLLAB CO.</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/"
            className={({isActive}) => cn(
              "text-sm font-medium transition-colors hover:text-team-primary duration-300",
              isActive ? "text-team-primary" : "text-foreground/80"
            )}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/add-member"
            className={({isActive}) => cn(
              "text-sm font-medium transition-colors hover:text-team-primary duration-300",
              isActive ? "text-team-primary" : "text-foreground/80"
            )}
          >
            Add Member
          </NavLink>
          <NavLink 
            to="/view-members"
            className={({isActive}) => cn(
              "text-sm font-medium transition-colors hover:text-team-primary duration-300",
              isActive ? "text-team-primary" : "text-foreground/80"
            )}
          >
            View Members
          </NavLink>
        </nav>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <nav className="flex items-center space-x-4">
            <NavLink 
              to="/"
              className={({isActive}) => cn(
                "p-1 transition-colors duration-300",
                isActive ? "text-team-primary" : "text-foreground/80"
              )}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/add-member"
              className={({isActive}) => cn(
                "p-1 transition-colors duration-300",
                isActive ? "text-team-primary" : "text-foreground/80"
              )}
            >
              Add
            </NavLink>
            <NavLink 
              to="/view-members"
              className={({isActive}) => cn(
                "p-1 transition-colors duration-300",
                isActive ? "text-team-primary" : "text-foreground/80"
              )}
            >
              Members
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
