
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Student Team Orbit</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your student team members efficiently. Add, view, and track all team members in one place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="border-2 border-team-light hover:border-team-primary transition-all">
          <CardHeader>
            <CardTitle className="text-team-secondary">Add New Member</CardTitle>
            <CardDescription>Add a new student to your team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Create a new team member profile with details like name, role, and contact information.
              Upload their profile picture to easily identify them.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/add-member" className="w-full">
              <Button className="w-full bg-team-primary hover:bg-team-secondary">
                Add Member
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-team-light hover:border-team-primary transition-all">
          <CardHeader>
            <CardTitle className="text-team-secondary">View Members</CardTitle>
            <CardDescription>See all your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Access the complete list of your team members. View their profiles and get detailed information
              about each member's role and contributions.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/view-members" className="w-full">
              <Button className="w-full bg-team-primary hover:bg-team-secondary">
                View Members
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Student Team Orbit</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Student Team Orbit is a comprehensive platform designed to help academic teams organize
          and manage their members effectively. Whether you're managing a research group, a project team,
          or a student organization, we've got you covered.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
