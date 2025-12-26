#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { consolePretty } from "./utils.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new Entry",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "Content of the Entry",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log("New note", note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to the entries",
  })
  .command(
    "all",
    "Get all notes",
    () => {},
    async () => {
      const allNotes = await getAllNotes();
      consolePretty(allNotes);
    }
  )
  .command(
    "find <filter>",
    "Get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const newNote = await findNotes(argv.filter);
      console.log(newNote);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const removedId = await removeNote(argv.id);
      console.log(removedId);
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      const removedNotes = removeAllNotes();
      console.log(removedNotes);
    }
  )
  .parse();
