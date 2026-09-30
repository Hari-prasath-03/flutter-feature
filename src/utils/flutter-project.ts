import path from "node:path";
import { access, readFile } from "node:fs/promises";

export async function isFlutterProject(projectRoot: string): Promise<boolean> {
  try {
    await access(path.join(projectRoot, "pubspec.yaml"));
    return true;
  } catch {
    return false;
  }
}

export async function getFlutterProjectName(projectRoot: string): Promise<string> {
  const pubspecPath = path.join(projectRoot, "pubspec.yaml");
  const pubspec = await readFile(pubspecPath, "utf-8");
  const match = pubspec.match(/^name:\s*(.+)$/m);
  if (!match) {
    throw new Error("Could not find the project name in pubspec.yaml");
  }
  return match[1]!.trim().replace(/^["']|["']$/g, "");
}