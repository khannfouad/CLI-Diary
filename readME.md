# CLI Diary

A modular **CLI-based diary application** built with Node.js that supports CRUD operations on diary entries, persists data in a local JSON database, and provides both **CLI and server-side rendered web views** of the data.

This project is intentionally kept small in scope and is used as a **practice project to explore backend engineering practices**, including abstraction, testing, server-side rendering, and basic tooling.

---

## Features

- Create, read and delete diary entries via CLI
- Persistent storage using a local JSON database
- Layered architecture with clear separation of concerns
- Server-side rendered (SSR) HTML view of diary entries
- Lightweight Node.js web server
- Automatic browser launch on web command
- Clean and readable CLI output via custom logging utilities
- Unit tests written with Jest

---

## Tech Stack

- **Node.js** v24.0.2
- **ES Modules** (`"type": "module"`)
- **fs** – file-based persistence
- **yargs** – CLI command parsing
- **open** – automatically open browser on web launch
- **Jest** – unit testing

---

## Architecture Overview

The application follows a **layered design** to avoid tight coupling and improve maintainability:

```text
CLI (yargs commands)
        ↓
Notes Service (business logic)
        ↓
Database Layer (JSON file abstraction)
```
