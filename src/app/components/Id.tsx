'use client';

import QRCode from "react-qr-code";

export function Id() {
    const id = localStorage.getItem('ID');

    if (!id) {
        return <div className="text-white">
            <p>ID: null</p>
        </div>
    } else {
        return <div className="text-white flex flex-col items-center justify-center space-y-2 ">
            <p className="text-xl font-bold uppercase">{id}</p>
            <div className=" bg-white rounded-lg p-2 text-center">
                <QRCode value={"/sync?id=" + id} size={128} />
            </div>
        </div>
    }
}
