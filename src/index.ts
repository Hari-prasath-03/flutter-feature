#!/usr/bin/env node

import { Command } from "commander";
import { createGenerateCommand } from "@/commands/generate.js";

const program = new Command();

program
  .name("flutter-feature")
  .description(
    "A command line tool to generate flutter feature module boilerplate directory structure",
  )
  .version("0.1.0");

program.addCommand(createGenerateCommand());

try {
  await program.parseAsync();
} catch (error) {
  console.error("✖ Error occurred while parsing the command line arguments.");
  console.error(error);
  process.exit(1);
}
