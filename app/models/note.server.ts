import type { Note } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({ id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, content: true, title: true },
    where: { id },
  });
}

export function getNoteListItems() {
  return prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  content,
  title,
}: Pick<Note, "content" | "title">) {
  return prisma.note.create({
    data: {
      title,
      content,
    },
  });
}

export function deleteNote({ id }: Pick<Note, "id">) {
  return prisma.note.deleteMany({
    where: { id },
  });
}
