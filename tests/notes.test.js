import { beforeEach, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  appendDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { appendDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  appendDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

describe("Testing my cli app", () => {
  test("Test for appendDB", async () => {
    const tags = ["test 1", "test 2"];
    const mockNote = {
      id: 1,
      content: "Test Note",
    };

    appendDB.mockResolvedValue(mockNote);

    const result = await newNote(mockNote.content, tags);
    expect(result.content).toEqual(mockNote.content);
    expect(result.tags).toEqual(tags);
  });

  test("Test to Get All Notes", async () => {
    const mockNotes = {
      notes: ["note 1", "note 2", "note 3"],
    };

    getDB.mockResolvedValue(mockNotes);

    const result = await getAllNotes();
    expect(result).toBe(mockNotes.notes);
  });

  it(" Should Test to see if unknown id returns undefined", async () => {
    const mockNotes = [
      { id: 1, content: "Note 1" },
      { id: 2, content: "Note 2" },
      { id: 3, content: "Note 3" },
      { id: 5, content: "Note 5" },
    ];

    saveDB.mockResolvedValue(mockNotes);
    const idToRemove = 4;

    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});
