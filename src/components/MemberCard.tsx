
import React from 'react';
import { Link } from 'react-router-dom';
import { Member } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  // Default image if no profile image is available
  const imageUrl = member.profileImage 
    ? `http://localhost:5000/uploads/${member.profileImage}`
    : '/placeholder.svg';
    
  // Use either _id or id depending on what the API returns
  const memberId = member._id || member.id;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={`${member.name}'s profile`} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{member.name}</h3>
        <p className="text-sm text-team-secondary truncate">{member.role}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link to={`/member/${memberId}`} className="w-full">
          <Button variant="outline" className="w-full border-team-primary text-team-primary hover:bg-team-light hover:text-team-secondary">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
