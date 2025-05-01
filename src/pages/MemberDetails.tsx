
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { membersApi, Member } from '@/services/api';

const MemberDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!id) {
        setError('Member ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        const data = await membersApi.getMemberById(id);
        if (data) {
          setMember(data);
        } else {
          setError('Member not found');
        }
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load member details.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberDetails();
  }, [id, toast]);
  
  // Image URL for the member's profile image
  const imageUrl = member?.profileImage 
    ? `http://localhost:5000/uploads/${member.profileImage}`
    : '/placeholder.svg';
  
  return (
    <div className="max-w-3xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/view-members')}
      >
        ← Back to Members
      </Button>
      
      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-40 h-40 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => navigate('/view-members')}>
              Return to Members List
            </Button>
          </CardContent>
        </Card>
      ) : member && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-team-primary">{member.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
              <img 
                src={imageUrl} 
                alt={`${member.name}'s profile`}
                className="w-full h-full object-cover" 
                onError={(e) => {
                  // Fallback to placeholder on error
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p className="text-lg text-gray-800">{member.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg text-gray-800">
                    <a href={`mailto:${member.email}`} className="hover:text-team-primary">
                      {member.email}
                    </a>
                  </p>
                </div>
              </div>
              
              {member.details && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Details</h3>
                  <p className="text-gray-800 whitespace-pre-line">{member.details}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-center">
            <Button 
              className="bg-team-primary hover:bg-team-secondary"
              onClick={() => navigate('/view-members')}
            >
              Back to All Members
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MemberDetailsPage;
