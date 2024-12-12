'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    useEffect(() => {
        if (id) {
            localStorage.setItem('ID', id);
            router.push('/');
        }
    }, [id, router]);
    return null;
}