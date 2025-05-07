
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { membersApi } from '@/services/api';

const AddMemberPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    details: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Set up mutation for form submission
  const addMemberMutation = useMutation({
    mutationFn: (submitData: FormData) => membersApi.addMember(submitData),
    onSuccess: () => {
      // Invalidate and refetch members list
      queryClient.invalidateQueries({ queryKey: ['members'] });
      
      toast({
        title: "Success!",
        description: "Team member added successfully.",
      });
      
      // Redirect to members list
      navigate('/view-members');
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to add team member. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.role || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create FormData object for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('role', formData.role);
    submitData.append('email', formData.email);
    submitData.append('details', formData.details);
    
    if (profileImage) {
      submitData.append('profileImage', profileImage);
    }
    
    // Execute mutation
    addMemberMutation.mutate(submitData);
  };
  
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-team-primary">Add New Team Member</CardTitle>
          <CardDescription>Fill out the form below to add a new team member.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <FormField
                label="Full Name *"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <FormField
                label="Role *"
                name="role"
                placeholder="e.g., Team Lead, Developer, Designer"
                value={formData.role}
                onChange={handleChange}
                required
              />
              
              <FormField
                label="Email *"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="grid gap-3">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea 
                  id="details"
                  name="details" 
                  placeholder="Add any additional information about this team member" 
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="profile-image">Profile Image</Label>
                <Input 
                  id="profile-image"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                
                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-4 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-team-primary hover:bg-team-secondary transition-colors duration-300"
                  disabled={addMemberMutation.isPending}
                >
                  {addMemberMutation.isPending ? 'Adding Member...' : 'Add Member'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Form field component to reduce repetition
interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  type = "text",
  required = false,
  onChange
}) => (
  <div className="grid gap-3">
    <Label htmlFor={name}>{label}</Label>
    <Input 
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default AddMemberPage;
