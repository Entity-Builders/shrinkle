import { UrlItem } from './types';

export const _mockUrlItem: UrlItem = {
  id: 'some-unique-id', // Optional, but good to include for completeness
  originalUrl: 'https://www.example.com/very/long/path/to/resource',
  shortCode: 'abc123', // A short, unique code representing the shortened URL
  createdAt: new Date(), // Optional, but useful for simulating real data
  updatedAt: new Date(), // Optional, but useful for simulating updates
  shortUrl: 'localhost/abc123',
};
