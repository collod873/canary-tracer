export type RootManifest = {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

export function readRootManifest(): RootManifest {
  throw new Error("#68: not built");
}
