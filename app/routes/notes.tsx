import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getNoteList } from "~/models/note.server";

export async function loader() {
  const notesList = await getNoteList();

  return json(notesList);
}

export default function NotesLayoutPage() {
  const notesList = useLoaderData<typeof loader>();

  return (
    <div className="h-full min-h-screen">
      <header className=" bg-slate-800 p-4 text-white">
        <h1 className="w-full text-center text-3xl font-bold">Notes</h1>
      </header>
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Note
          </Link>

          <hr />

          {notesList.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {notesList.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${
                        isActive ? "bg-cyan-800" : ""
                      }`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
