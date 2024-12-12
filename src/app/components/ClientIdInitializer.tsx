'use client';

import { useState, useEffect } from 'react';
import { generateRandomString } from '../utils/utils';

export function ClientIdInitializer() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedId = localStorage.getItem('ID');

      if (!storedId) {
        storedId = generateRandomString(16);
        localStorage.setItem('ID', storedId);
      }
      setId(storedId);
    }
  }, []);

  return null;
}