import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";

import { renderString, renderTemplate } from "@/utils/template.js";
import { toCamelCase, toPascalCase } from "@/utils/naming.js";
import { featureTemplates } from "@/generators/feature/template-path.js";
import type { FolderMap } from "@/types/index.js";

const FEATURE_DIRECTORIES = [
  // data
  "data/datasources",
  "data/models",
  "data/repositories",
  // domain
  "domain/entities",
  "domain/repositories",
  "domain/usecases",
  // presentation
  "presentation/bloc",
  "presentation/pages",
  "presentation/widgets",
] satisfies {
  [T in keyof FolderMap]: `${T}/${FolderMap[T]}`;
}[keyof FolderMap][];

export async function generateFeature({
  projectRoot,
  featureName,
  appName,
}: {
  projectRoot: string;
  featureName: string;
  appName: string;
}): Promise<void> {
  const featurePath = path.join(projectRoot, "lib", "features", featureName);
  await generateBaseFolderStructure(featurePath);
  await generateFilesAndBoilerPlateCode(featurePath, appName, featureName);
}

async function generateBaseFolderStructure(featurePath: string): Promise<void> {
  await Promise.all(
    FEATURE_DIRECTORIES.map((directory) =>
      mkdir(path.join(featurePath, directory), { recursive: true }),
    ),
  );
}

async function generateFilesAndBoilerPlateCode(
  featurePath: string,
  appName: string,
  featureName: string,
): Promise<void> {
  const variables = {
    appName,
    snakeName: featureName,
    pascalName: toPascalCase(featureName),
    camelName: toCamelCase(featureName),
  };

  await Promise.all(
    featureTemplates.map(async (template) => {
      const { layer, folder, template: templateName } = template;

      const templatePath = fileURLToPath(
        new URL(
          `../../templates/feature/${layer}/${folder}/${templateName}`,
          import.meta.url,
        ),
      );

      const outputFileName = renderString(template.output, variables);
      const outputPath = path.join(featurePath, layer, folder, outputFileName);

      const content = await renderTemplate(templatePath, variables);
      await writeFile(outputPath, content);
    }),
  );
}
