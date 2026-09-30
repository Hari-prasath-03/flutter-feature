export type FolderMap = {
  data: "datasources" | "models" | "repositories";
  domain: "entities" | "repositories" | "usecases";
  presentation: "widgets" | "pages" | "bloc";
};

export type Layer = keyof FolderMap;

export interface FeatureTemplate<L extends Layer> {
  readonly layer: L;
  readonly folder: FolderMap[L];
  readonly template: `${string}.dart.template`;
  readonly output: `{{snakeName}}${string}.dart`;
}

export type AllFeatureTemplate =
  | FeatureTemplate<"data">
  | FeatureTemplate<"domain">
  | FeatureTemplate<"presentation">;

export type VariablesInTemplate =
  | "appName"
  | "snakeName"
  | "camelName"
  | "pascalName";

export type TemplateVariables = Record<VariablesInTemplate, string>;
