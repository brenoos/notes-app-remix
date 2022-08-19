import { json, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getNote } from "~/models/note.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteId, "noteId is required");

  const note = await getNote({ id: params.noteId });

  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ note });
}

export default function NoteDetailsPage() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{note.title}</h3>
      <p className="py-6">{note.content}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred</div>;
}
