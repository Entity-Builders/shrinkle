import { useCallback, useContext, useState } from 'react';
import { REDIRECT_BASE_URL } from '../../constants';
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
import { debounce } from 'lodash';
import { supabase } from '../../supabase';
import { init } from '@paralleldrive/cuid2';

const createId = init({
  random: Math.random,
  length: 5,
  fingerprint: 'shrinkle-url-shortener',
});

const isValidUrl = (
  urlString: string,
  allowedProtocols: string[] = ['http:', 'https:'],
) => {
  try {
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
    setError('');

    try {
      const cleanedUrl = cleanUrl(
        longUrl.startsWith('http://') || longUrl.startsWith('https://')
          ? longUrl
          : `http://${longUrl}`,
      );

      const isValid = isValidUrl(cleanedUrl);
      if (!isValid) {
        setError('Please enter a valid URL');
        return;
      }

      const shortCode = createId();

      // Insert directly into Supabase
      const { data, error: supabaseError } = await supabase
        .from('short_urls')
        .insert({
          original_url: cleanedUrl,
          short_code: shortCode,
        })
        .select()
        .single();

      if (supabaseError) {
        setError(
          supabaseError.message || 'An error occurred while shortening the URL',
        );
        return;
      }

      if (data) {
        const shortUrl = `${REDIRECT_BASE_URL}/${data.short_code}`;
        saveUrlItem({
          originalUrl: data.original_url,
          shortCode: data.short_code,
          shortUrl,
        });
        setLongUrl('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(
        'A network error occurred. Please check your connection and try again.',
      );
      setLongUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.target.value);
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
    loop: true,
  });

  const handleButtonClick = useCallback(
    () => debounce(handleSubmit, 1000),
    [handleSubmit],
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
