import { Outlet } from "@remix-run/react";

export default function NotesLayoutPage() {
  return (
    <div>
      <header className=" bg-slate-800 p-4 text-white">
        <h1 className="w-full text-center text-3xl font-bold">Notes</h1>
      </header>
      <main className="flex h-full bg-white">
        <Outlet />
      </main>
    </div>
  );
}
