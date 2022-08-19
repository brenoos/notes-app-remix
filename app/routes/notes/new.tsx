import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createNote } from "~/models/note.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  console.log("Action");

  const title = formData.get("title");
  const content = formData.get("content");

  const note = await createNote({ title, content });

  return redirect(`/notes/${note.id}`);
}

export default function NewNotePage() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>content: </span>
          <textarea
            name="content"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
          />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
