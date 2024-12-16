import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

export function getClientId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('clientId');
}

export function setClientId(clientId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('clientId', clientId);
}


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}