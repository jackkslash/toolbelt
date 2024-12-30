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
    if (!clientId) return;
    localStorage.setItem('ID', clientId);
}

interface dateGroups {
    month: string;  // Format: "YYYY-MM"
    monthText: string;
    dates: string[];  // Full ISO 8601 dates for that month
}


export function getLastNDays(days: number = 365): dateGroups[] {
    const today = new Date();
    const monthGroups: { [key: string]: string[] } = {}
    for (let i = days; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        date.setHours(0, 0, 0, 0)

        const monthKey = date.toISOString().slice(0, 7)
        const fullDate = date.toISOString().slice(0, 10)
        if (!monthGroups[monthKey]) {
            monthGroups[monthKey] = []
        }
        if (!monthGroups[monthKey].includes(fullDate)) {
            monthGroups[monthKey].push(fullDate)
        }
    }

    return Object.entries(monthGroups).map(([key, dates]) => ({
        month: key,
        monthText: new Date(key).toLocaleDateString('en-US', { month: 'short' }),
        dates
    }))
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}