import Link from "next/link";
import { ClientIdInitializer } from "./components/ClientIdInitializer";
export default function Home() {
  return (
    <>
      <ClientIdInitializer />
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <h1 className="text-6xl font-bold text-white">toolbelt</h1>
        <div className="flex flex-col gap-2 p-8 text-white font-bold">
          <Link className="hover:text-gray-400" href="/">
            habbit </Link>
          <Link className="hover:text-gray-400" href="/">
            notes </Link>
          <Link className="hover:text-gray-400" href="/">
            pomodoro </Link>
        </div>
      </div>
    </>

  );
}
