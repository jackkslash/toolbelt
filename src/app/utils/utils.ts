import { useState } from "react";

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

export function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        if (typeof window === 'undefined') return false;

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            // Reset copied state after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);

            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setIsCopied(false);
            return false;
        }
    };

    return { copyToClipboard, isCopied };
}