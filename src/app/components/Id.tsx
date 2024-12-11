'use client';

import QRCode from "react-qr-code";

export function Id() {
    const id = localStorage.getItem('ID');

    if (!id) {
        return <div className="text-white">
            <p>ID: null</p>
        </div>
    } else {
        return <div className="text-white flex flex-col items-center justify-center">
            <p>{id}</p>
            <div className="w-full bg-white rounded-lg p-4 text-center">
                <QRCode value={id!.toString()} size={256} />
            </div>
        </div>
    }
}