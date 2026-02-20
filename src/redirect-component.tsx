import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GET_SHORT_URL } from './constants';

const RedirectComponent = () => {
  const { shortCode } = useParams(); // Get the short code from the URL
  const navigate = useNavigate();

  useEffect(() => {
    console.log('$$$ GET_SHORT_URL:', GET_SHORT_URL);
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(
          `${GET_SHORT_URL}?shortCode=${shortCode}`,
          {
            // Your server endpoint
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          console.log('$$$ originalUrl:', data.originalUrl);
          window.location.href = data.originalUrl; // Redirect to the original URL
        } else {
          // Handle error (e.g., short URL not found)
          console.error('Error fetching original URL:', response.statusText);
          // You might want to redirect to an error page or display a message
        }
      } catch (error) {
        console.error('Error fetching original URL:', error);
        // Handle network or other errors
      }
    };

    fetchOriginalUrl();
  }, [shortCode, navigate]); // Run the effect only when shortCode changes

  return <div>Redirecting...</div>; // Or a loading indicator
};

export default RedirectComponent;
