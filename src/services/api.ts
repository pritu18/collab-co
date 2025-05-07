
import supabase from '@/lib/supabase';

// Define types
export interface Member {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  email: string;
  profileImage?: string;
  details?: string;
}

// API calls for members
export const membersApi = {
  // Get all members
  getAllMembers: async (): Promise<Member[]> => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*');
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  },

  // Get member by ID
  getMemberById: async (id: string): Promise<Member | null> => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error(`Error fetching member with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new member
  addMember: async (memberData: FormData): Promise<Member | null> => {
    try {
      // Extract member data
      const name = memberData.get('name') as string;
      const role = memberData.get('role') as string;
      const email = memberData.get('email') as string;
      const details = memberData.get('details') as string;
      const profileImageFile = memberData.get('profileImage') as File;
      
      // First save the member data
      const { data: memberRecord, error: memberError } = await supabase
        .from('members')
        .insert([
          { name, role, email, details }
        ])
        .select()
        .single();
        
      if (memberError) throw memberError;
      
      // If we have a profile image, upload it to storage
      if (profileImageFile && profileImageFile.name) {
        const fileExt = profileImageFile.name.split('.').pop();
        const fileName = `${memberRecord.id}.${fileExt}`;
        const filePath = `profiles/${fileName}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('member-photos')
          .upload(filePath, profileImageFile);
          
        if (uploadError) throw uploadError;
        
        // Update the member record with the profile image path
        const { data: updatedMember, error: updateError } = await supabase
          .from('members')
          .update({ profileImage: filePath })
          .eq('id', memberRecord.id)
          .select()
          .single();
          
        if (updateError) throw updateError;
        
        return updatedMember;
      }
      
      return memberRecord;
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  }
};
