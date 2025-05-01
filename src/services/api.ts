
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

// Configure axios with defaults for better error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API calls for members
export const membersApi = {
  // Get all members
  getAllMembers: async (): Promise<Member[]> => {
    try {
      const response = await apiClient.get('/members');
      return response.data;
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error; // Re-throw for proper error handling in components
    }
  },

  // Get member by ID
  getMemberById: async (id: string): Promise<Member | null> => {
    try {
      const response = await apiClient.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching member with ID ${id}:`, error);
      throw error; // Re-throw for proper error handling in components
    }
  },

  // Add a new member
  addMember: async (memberData: FormData): Promise<Member | null> => {
    try {
      const response = await apiClient.post('/members', memberData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding member:", error);
      throw error; // Re-throw for proper error handling in components
    }
  }
};
