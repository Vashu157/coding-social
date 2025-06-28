import { supabase } from '../lib/Supabase.js';

export const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles') 
    .select('*')
    .order('created_at', { ascending: false }); 

  if (error) {
    console.error("Error fetching profiles:", error.message);
    return [];
  }

  return data || [];
};
