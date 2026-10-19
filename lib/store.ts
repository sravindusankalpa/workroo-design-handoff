import os from "os";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { MongoClient } from "mongodb";
import { LIBRARY, libraryComponent } from "./library";
import type { StudioComponent, StudioQuestion } from "./types";

type DbShape = { components: StudioComponent[]; questions: StudioQuestion[] };

const DATA_DIR =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    ? path.join(os.tmpdir(), "workroo-data")
    : path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "studio.json");
const DEFAULT_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/workroo_design";

type MongoCache = { client?: MongoClient; uri?: string };
const g = globalThis as unknown as { __workrooMongo?: MongoCache };

async function fileDb(): Promise<DbShape> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as DbShape;
  } catch {
    const fresh: DbShape = { components: LIBRARY, questions: [] };
    try {
      await mkdir(path.dirname(FILE), { recursive: true });
      await writeFile(FILE, JSON.stringify(fresh, null, 2));
    } catch (e) {
      console.error("[fileDb write error]", e);
    }
    return fresh;
  }
}

async function saveFile(db: DbShape) {
  try {
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error("[saveFile write error]", e);
  }
}

async function mongo() {
  try {
    const cache = (g.__workrooMongo ??= {});
    if (!cache.client || cache.uri !== DEFAULT_URI) {
      const client = new MongoClient(DEFAULT_URI, { serverSelectionTimeoutMS: 5000 });
      await client.connect();
      cache.client = client;
      cache.uri = DEFAULT_URI;
    }
    const db = cache.client.db();
    const components = db.collection<StudioComponent>("components");
    const questions = db.collection<StudioQuestion>("questions");
    if ((await components.countDocuments()) === 0) {
      await components.insertMany(LIBRARY);
    }
    return { components, questions, connected: true as const };
  } catch (err) {
    console.error("[MongoDB connection failed]", err);
    g.__workrooMongo = {};
    return null;
  }
}

export async function getConnection() {
  const m = await mongo();
  return {
    mongo: Boolean(m),
    uriHint: DEFAULT_URI.replace(/\/\/.*@/, "//***@"),
  };
}

export async function listComponents(): Promise<StudioComponent[]> {
  await mongo();
  return LIBRARY;
}

export async function getComponent(slug: string): Promise<StudioComponent | null> {
  return libraryComponent(slug);
}

export async function listQuestions(slug: string): Promise<StudioQuestion[]> {
  const m = await mongo();
  if (m) return m.questions.find({ slug }).sort({ createdAt: -1 }).toArray();
  return (await fileDb()).questions.filter((q) => q.slug === slug).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addQuestion(input: { slug: string; author: string; question: string }) {
  const component = await getComponent(input.slug);
  const auto = component
    ? `From the design system for **${component.name}**:\n\n${component.notes}\n\nHTML class hooks: copy the HTML tab. CSS lives in \`app/globals.css\` under the selectors in the CSS tab.`
    : undefined;
  const doc: StudioQuestion = {
    id: crypto.randomUUID(),
    slug: input.slug,
    author: input.author || "dev",
    question: input.question,
    answer: auto,
    answeredBy: auto ? "Design notes" : undefined,
    createdAt: new Date().toISOString(),
    answeredAt: auto ? new Date().toISOString() : undefined,
  };
  const m = await mongo();
  if (m) {
    await m.questions.insertOne(doc);
    return doc;
  }
  const db = await fileDb();
  db.questions.unshift(doc);
  await saveFile(db);
  return doc;
}

export async function answerQuestion(id: string, answer: string, answeredBy: string) {
  const patch = { answer, answeredBy, answeredAt: new Date().toISOString() };
  const m = await mongo();
  if (m) {
    await m.questions.updateOne({ id }, { $set: patch });
    return m.questions.findOne({ id });
  }
  const db = await fileDb();
  const item = db.questions.find((q) => q.id === id);
  if (!item) return null;
  Object.assign(item, patch);
  await saveFile(db);
  return item;
}
