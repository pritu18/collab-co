
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { membersApi, Member } from '@/services/api';
import MemberCard from '@/components/MemberCard';
import { Skeleton } from '@/components/ui/skeleton';

const ViewMembersPage = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.getAllMembers();
        setMembers(data);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load team members.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, [toast]);
  
  // Loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col animate-pulse">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-6 w-4/5 mt-4" />
        <Skeleton className="h-4 w-3/5 mt-2" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    ));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
        <p className="text-gray-300">
          {loading ? 'Loading team members...' : 
           error ? error : 
           `Showing ${members.length} team member${members.length !== 1 ? 's' : ''}`}
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeletons()}
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-900/30 rounded-lg animate-fade-in">
          <p className="text-red-400">{error}</p>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg animate-fade-in">
          <h3 className="text-xl font-medium text-white mb-2">No team members found</h3>
          <p className="text-gray-300 mb-4">Start by adding a new team member.</p>
          <a href="/add-member" className="text-team-primary hover:text-team-secondary transition-colors duration-300 font-medium">
            Add your first team member
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div key={member._id || member.id} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembersPage;
