import { useState, useCallback } from 'react';
import { PexelsResponse } from '../types';
import { PEXELS_API_KEY } from '@/utils/constant';

export function usePexels() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPhotos = useCallback(async (query: string, perPage: number = 20) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll use a mock response since we don't have a real API key
      const mockPhotos = Array.from({ length: perPage }, (_, i) => ({
        id: Math.random() * 1000000,
        width: 400 + Math.random() * 400,
        height: 300 + Math.random() * 500,
        url: `https://picsum.photos/400/${300 + Math.floor(Math.random() * 200)}?random=${Date.now() + i}`,
        photographer: `Photographer ${i + 1}`,
        photographer_url: '',
        photographer_id: i + 1,
        avg_color: '#' + Math.floor(Math.random()*16777215).toString(16),
        src: {
          original: `https://picsum.photos/800/${600 + Math.floor(Math.random() * 400)}?random=${Date.now() + i}`,
          large2x: `https://picsum.photos/800/${600 + Math.floor(Math.random() * 400)}?random=${Date.now() + i}`,
          large: `https://picsum.photos/600/${450 + Math.floor(Math.random() * 300)}?random=${Date.now() + i}`,
          medium: `https://picsum.photos/400/${300 + Math.floor(Math.random() * 200)}?random=${Date.now() + i}`,
          small: `https://picsum.photos/300/${225 + Math.floor(Math.random() * 150)}?random=${Date.now() + i}`,
          portrait: `https://picsum.photos/400/${600 + Math.floor(Math.random() * 200)}?random=${Date.now() + i}`,
          landscape: `https://picsum.photos/600/${400 + Math.floor(Math.random() * 100)}?random=${Date.now() + i}`,
          tiny: `https://picsum.photos/200/${150 + Math.floor(Math.random() * 100)}?random=${Date.now() + i}`,
        },
        liked: false,
      }));

      const mockResponse: PexelsResponse = {
        page: 1,
        per_page: perPage,
        photos: mockPhotos,
        total_results: 1000,
      };

      setLoading(false);
      // return mockResponse;

      // Real API call would be:
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      throw err;
    }
  }, []);

  return { searchPhotos, loading, error };
}