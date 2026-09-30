export function toSnakeCase(str: string): string {
  return str
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

export function toPascalCase(str: string): string {
  return toSnakeCase(str)
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function toCamelCase(str: string): string {
  const pascalCase = toPascalCase(str);
  if (!pascalCase) return "";
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}
