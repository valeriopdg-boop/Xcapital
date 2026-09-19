/**
 * Converte gli articoli markdown di content/articles/ in un JSON consumabile
 * dal frontend (src/generated/articles.json). Eseguito automaticamente prima
 * di `npm run dev` e `npm run build` (script predev/prebuild).
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const articlesDir = path.join(root, "content", "articles");
const outDir = path.join(root, "src", "generated");
const outFile = path.join(outDir, "articles.json");

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true;
    if (value === "false") value = false;
    data[key] = value;
  }
  return { data, body: match[2] };
}

async function main() {
  let files = [];
  try {
    files = (await readdir(articlesDir)).filter((file) => file.endsWith(".md"));
  } catch {
    // Nessuna cartella articoli: generiamo comunque un JSON vuoto.
  }

  const articles = [];
  for (const file of files) {
    const raw = await readFile(path.join(articlesDir, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    if (data.draft === true) continue;
    const slug = file.replace(/\.md$/, "");
    articles.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      image: data.image || null,
      html: marked.parse(body.trim(), { async: false }),
    });
  }

  articles.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, `${JSON.stringify(articles, null, 2)}\n`);
  console.log(`Articoli generati: ${articles.length} → src/generated/articles.json`);
}

await main();
