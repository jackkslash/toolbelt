import Analytics from '@/app/components/Analytics';
import React from 'react';

export default async function Page({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params; // No need to await; params is not a Promise
    console.log(id);

    return (
        <div>
            <Analytics id={id} />
        </div>
    );
}