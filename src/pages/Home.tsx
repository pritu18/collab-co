
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Collab Co.</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Manage your team members efficiently. Add, view, and track all team members in one place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="border-2 border-team-light hover:border-team-primary transition-all duration-300 hover:shadow-lg hover:shadow-team-primary/20 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-team-secondary">Add New Member</CardTitle>
            <CardDescription>Add a new team member</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Create a new team member profile with details like name, role, and contact information.
              Upload their profile picture to easily identify them.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/add-member" className="w-full">
              <Button className="w-full bg-team-primary hover:bg-team-secondary transition-all duration-300">
                Add Member
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-team-light hover:border-team-primary transition-all duration-300 hover:shadow-lg hover:shadow-team-primary/20 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-team-secondary">View Members</CardTitle>
            <CardDescription>See all your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Access the complete list of your team members. View their profiles and get detailed information
              about each member's role and contributions.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/view-members" className="w-full">
              <Button className="w-full bg-team-primary hover:bg-team-secondary transition-all duration-300">
                View Members
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-2xl font-semibold text-white mb-4">About Collab Co.</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Collab Co. is a comprehensive platform designed to help teams organize
          and manage their members effectively. Whether you're managing a research group, a project team,
          or an organization, we've got you covered.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
