
import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5000/api';

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
      const response = await axios.get(`${API_BASE_URL}/members`);
      return response.data;
    } catch (error) {
      console.error("Error fetching members:", error);
      return [];
    }
  },

  // Get member by ID
  getMemberById: async (id: string): Promise<Member | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/members/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching member with ID ${id}:`, error);
      return null;
    }
  },

  // Add a new member
  addMember: async (memberData: FormData): Promise<Member | null> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/members`, memberData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding member:", error);
      return null;
    }
  }
};
