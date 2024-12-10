'use client';

import { useEffect } from "react";
import { generateRandomString } from "../utils/utils";

export function ClientIdInitializer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingId = localStorage.getItem('ID');
    if (!existingId) {
      const ID = generateRandomString(16);
      localStorage.setItem('ID', ID);
    }
  }, []);
  return null;
}