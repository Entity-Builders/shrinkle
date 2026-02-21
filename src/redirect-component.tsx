import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EDGE_FUNCTION_REDIRECT } from './constants';

const RedirectComponent = () => {
  const { shortCode } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(EDGE_FUNCTION_REDIRECT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shortCode }),
        });

        if (response.ok) {
          const { originalUrl } = await response.json();
          window.location.href = originalUrl;
        } else {
          setError('Short URL not found');
        }
      } catch (error) {
        console.error('Error fetching original URL:', error);
        setError('An error occurred while redirecting');
      }
    };

    if (shortCode) {
      fetchOriginalUrl();
    }
  }, [shortCode]);

  if (error) return <div>{error}</div>;
  return <div>Redirecting...</div>;
};

export default RedirectComponent;
