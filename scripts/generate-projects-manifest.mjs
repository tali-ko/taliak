import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const projectsDir = path.join(rootDir, "projects");
const manifestPath = path.join(projectsDir, "manifest.json");

await mkdir(projectsDir, { recursive: true });

const entries = await readdir(projectsDir, { withFileTypes: true });
const htmlFiles = entries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const toPrettyTitle = (name) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const projects = [];
for (const filename of htmlFiles) {
  const filepath = path.join(projectsDir, filename);
  const source = await readFile(filepath, "utf8");
  const titleMatch = source.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const slug = filename.replace(/\.html$/i, "");

  projects.push({
    title: (titleMatch?.[1] || toPrettyTitle(slug)).trim(),
    file: filename,
    path: `projects/${filename}`,
  });
}

await writeFile(manifestPath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
console.log(`Generated ${manifestPath} with ${projects.length} project(s).`);
