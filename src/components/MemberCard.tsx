
import React from 'react';
import { Link } from 'react-router-dom';
import { Member } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { supabaseUrl } from '@/lib/supabase';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  // Get image URL from Supabase if available, otherwise use placeholder
  const imageUrl = member.profileImage 
    ? `${supabaseUrl}/storage/v1/object/public/member-photos/${member.profileImage}`
    : '/placeholder.svg';
    
  // Use either _id or id depending on what the API returns
  const memberId = member.id || member._id;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-team-primary/20 flex flex-col transform hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-gray-800">
        <img 
          src={imageUrl} 
          alt={`${member.name}'s profile`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg text-white truncate">{member.name}</h3>
        <p className="text-sm text-team-primary truncate">{member.role}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link to={`/member/${memberId}`} className="w-full">
          <Button variant="outline" className="w-full border-team-primary text-team-primary hover:bg-team-light hover:text-background transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
