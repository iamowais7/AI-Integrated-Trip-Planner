import { useState, useEffect } from 'react';
import api from '../api/client';

const cache = new Map();

export function useImage(query) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!query) return;
    if (cache.has(query)) {
      setUrl(cache.get(query));
      return;
    }
    api.get(`/images?q=${encodeURIComponent(query)}`)
      .then((res) => {
        const imgUrl = res.data.url;
        if (imgUrl) {
          cache.set(query, imgUrl);
          setUrl(imgUrl);
        }
      })
      .catch(() => {});
  }, [query]);

  return url;
}
