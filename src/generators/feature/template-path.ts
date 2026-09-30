import type {
  AllFeatureTemplate,
  FeatureTemplate,
  Layer,
} from "@/types/index.js";

const t = <L extends Layer>(x: FeatureTemplate<L>) => x;

const dataFeatureTemplates = [
  t({
    layer: 'data',
    folder: 'models',
    template: 'model.dart.template',
    output: '{{snakeName}}_model.dart',
  }),
  t({
    layer: 'data',
    folder: 'repositories',
    template: 'repository.dart.template',
    output: '{{snakeName}}_repository.dart',
  }),
  t({
    layer: 'data',
    folder: 'datasources',
    template: 'datasource.dart.template',
    output: '{{snakeName}}_remote_datasource.dart',
  }),
] satisfies FeatureTemplate<"data">[];

const domainFeatureTemplates = [
  t({
    layer: "domain",
    folder: "entities",
    template: "entity.dart.template",
    output: "{{snakeName}}.dart",
  }),
  t({
    layer: "domain",
    folder: "repositories",
    template: "repository.dart.template",
    output: "{{snakeName}}_repository.dart",
  }),
] satisfies FeatureTemplate<"domain">[];

const presentationFeatureTemplates = [
  t({
    layer: "presentation",
    folder: "bloc",
    template: "bloc.dart.template",
    output: "{{snakeName}}_bloc.dart",
  }),
  t({
    layer: "presentation",
    folder: "bloc",
    template: "event.dart.template",
    output: "{{snakeName}}_event.dart",
  }),

  t({
    layer: "presentation",
    folder: "bloc",
    template: "state.dart.template",
    output: "{{snakeName}}_state.dart",
  }),
] satisfies FeatureTemplate<"presentation">[];

export const featureTemplates: AllFeatureTemplate[] = [
  ...dataFeatureTemplates,
  ...domainFeatureTemplates,
  ...presentationFeatureTemplates,
];
