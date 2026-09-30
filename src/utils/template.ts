import { readFile } from "node:fs/promises";

import type { TemplateVariables } from "@/types/index.js";

export function renderString(
  template: string,
  variables: TemplateVariables,
): string {
  for (const [key, value] of Object.entries(variables)) {
    template = template.replaceAll(`{{${key}}}`, value);
  }

  return template;
}

export async function renderTemplate(
  templatePath: string,
  variables: TemplateVariables,
): Promise<string> {
  const template = await readFile(templatePath, "utf-8");
  return renderString(template, variables);
}
