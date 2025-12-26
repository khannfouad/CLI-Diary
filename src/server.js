import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { create } from "node:domain";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, "template.html");

const regexForReplace = /\{\{\s*(\w+)\s*}\}/g;

export const interpolate = (html, data) => {
  return html.replace(regexForReplace, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

export const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
    <div class ="note">
    <p>${note.content}</p>
    <div class="tags">
    ${note.tags.map((tag) => `<span class ="tag> ${tag} </span>`).join("")}
    </div>
    </div>
    `;
    })
    .join("\n");
};

export const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const template = await fs.readFile(htmlPath, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);

  server.listen(port, () => {
    const address = `http://localhost:${port}`;
    console.log(`server on ${address}`);

    open(address);
  });
};
