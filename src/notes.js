import { appendDB, saveDB, getDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    tags,
    content: note,
  };

  await appendDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (id) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(id.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id != id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = () => saveDB({ notes: [] });
