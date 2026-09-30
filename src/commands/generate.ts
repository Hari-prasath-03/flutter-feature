import { Command } from "commander";
import { generateFeature } from "@/generators/feature/generator.js";
import { isFlutterProject, getFlutterProjectName } from "@/utils/flutter-project.js";
import { toSnakeCase } from "@/utils/naming.js";

export function createGenerateCommand(): Command {
  return new Command("generate")
    .alias("g")
    .description("Generate a new flutter feature module")
    .argument("<featureName>", "Name of the feature")
    .action(action);
}

async function action(featureName: string) {
  const projectRoot = process.cwd();

  const isFlutter = await isFlutterProject(projectRoot);
  if (!isFlutter) {
    console.error("✖ Not a Flutter project.");
    console.error("  Run this command from a Flutter project root.");
    process.exit(1);
  }
  
  const normalizedFeatureName = toSnakeCase(featureName);
  if (!normalizedFeatureName) {
    console.error("✖ Invalid feature name.");
    process.exit(1);
  }
  
  const appName = await getFlutterProjectName(projectRoot);
  await generateFeature({
    projectRoot,
    featureName: normalizedFeatureName,
    appName,
  });
  console.log(`✓ Generating feature: ${normalizedFeatureName}`);
}
