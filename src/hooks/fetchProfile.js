import { useEffect, useState } from 'react';
import { fetchProfiles } from '../utils/fetchProfiles';

export default function useFetchProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, []);

  return { profiles, loading, error };
}
