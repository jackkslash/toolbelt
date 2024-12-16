import { useState } from "react";

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