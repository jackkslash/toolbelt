import Link from "next/link";
import { SyncModal } from "./components/SyncModal";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-900 h-screen">
        <div className="flex flex-row items-center justify-center gap-4 text-white">
          <Link href="/">
            <h1 className="text-6xl font-bold text-white">toolbelt</h1>
          </Link>
          <div className="flex flex-col gap-2 p-8 text-white font-bold">
            <Link className="hover:text-gray-400" href="/habit">
              habit </Link>
            <Link className="hover:text-gray-400" href="/notes">
              notes </Link>
            <Link className="hover:text-gray-400" href="/pomodoro">
              pomodoro </Link>
          </div>
        </div>
        <SyncModal />
      </div>

    </>

  );
}
