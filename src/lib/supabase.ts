
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
export const supabaseUrl = 'https://tvnnxevqxgguhiregvnt.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bm54ZXZxeGdndWhpcmVndm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NDM3MjUsImV4cCI6MjA2MjIxOTcyNX0.xR5Nk9iQeScnTVDWDfC5fYLEbnIatY9df48M6Af9Ho8';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
