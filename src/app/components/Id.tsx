'use client';

import QRCode from "react-qr-code";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyClipboard";

export function Id() {
    const id = localStorage.getItem('ID');
    const { copyToClipboard, isCopied } = useCopyToClipboard();

    if (!id) {
        return <div className="text-white">
            <p>ID: null</p>
        </div>
    } else {
        return <div className="text-white flex flex-col items-center justify-center space-y-2 ">
            <div className="flex flex-row items-center justify-center space-x-4">
                <p className="text-xl font-bold uppercase">{id}</p>
                <button onClick={() => {
                    copyToClipboard(id)
                }} className="text-white">{isCopied ? <Check /> : <Copy />}</button>
            </div>
            <div className=" bg-white rounded-lg p-2 text-center">
                <QRCode value={"/sync?id=" + id} size={128} />
            </div>
        </div>
    }
}
