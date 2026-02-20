import { useCallback, useContext, useState } from 'react';
import { CREATE_SHORT_URL, ENDPOINT_BE_REDIRECT } from '../../constants';
import { cleanUrl } from '../../utils';
import { useSpring } from '@react-spring/web';
import uniqolor from 'uniqolor';
import { MainContext } from '../../main-context';
import {
  BorderAnimated,
  Button,
  FormStyled,
  Input,
  FormContainer,
} from './styles';
import { UrlItem } from '../../types';
import { debounce } from 'lodash';

const isValidUrl = (
  urlString: string,
  allowedProtocols: string[] = ['http:', 'https:']
) => {
  try {
    // If no protocol is provided, assume 'https://'
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = 'https://' + urlString;
    }

    const url = new URL(urlString);
    return allowedProtocols.includes(url.protocol);
  } catch (error) {
    return false;
  }
};

const useForm = () => {
  const { saveUrlItem } = useContext(MainContext);
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Clear any previous errors

    try {
      // Normalize and clean the URL upfront
      const cleanedUrl = cleanUrl(
        longUrl.startsWith('http://') || longUrl.startsWith('https://')
          ? longUrl
          : `http://${longUrl}`
      );

      const isValid = isValidUrl(cleanedUrl);
      console.log('$$$ isValid:', isValid);
      if (!isValid) {
        alert();
        return;
      }

      const response = await fetch(CREATE_SHORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: cleanedUrl }),
      });

      if (response.ok) {
        const { data }: { data: UrlItem } = await response.json();
        const shortUrl = `${ENDPOINT_BE_REDIRECT}/${data.shortCode}`; // No need for optional chaining if response is ok

        // Consider using a more descriptive function name than 'saveUrlItem' if possible
        saveUrlItem({ ...data, shortUrl });
        setLongUrl(''); // Clear the input field
      } else {
        // Handle specific error responses from the API if possible
        const errorData = await response.json();
        setError(
          errorData.error || 'An error occurred while shortening the URL'
        );
      }
    } catch (error) {
      console.error('Network error:', error);
      setError(
        'A network error occurred. Please check your connection and try again.'
      );
      setLongUrl(''); // Clear the input field even on network errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.target.value); // Update inputValue whenever the input changes
  };

  return {
    handleSubmit,
    handleChange,
    error,
    longUrl,
    isLoading,
  };
};

export const Form = () => {
  const { handleChange, handleSubmit, longUrl, error, isLoading } = useForm();

  const color1 = uniqolor.random({
    differencePoint: 10,
    lightness: [90, 20],
    format: 'hex',
  }).color;

  const color2 = uniqolor.random({
    differencePoint: 2,
    lightness: [300, 90],
    format: 'hex',
  }).color;

  const colorSequence = [color1, color2];
  const borderAnimation = useSpring({
    borderColor: colorSequence[0],
    config: {
      duration: 1000,
    },
    loop: true, // Use the loop prop for continuous animation
  });

  const handleButtonClick = useCallback(
    () => debounce(handleSubmit, 1000),
    [handleSubmit]
  );

  return (
    <FormContainer>
      <FormStyled onSubmit={handleSubmit}>
        <BorderAnimated
          style={
            {
              borderAnimation,
            } as React.CSSProperties
          }
        >
          <Input
            type='text'
            value={longUrl}
            onChange={(e) => handleChange(e)}
            placeholder='Enter long URL'
            required
            id='long-url'
            autoFocus
          />
        </BorderAnimated>
        <Button disabled={isLoading} onClick={handleButtonClick}>
          {isLoading ? 'Loading...' : 'Shrinkle it'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormStyled>
    </FormContainer>
  );
};
