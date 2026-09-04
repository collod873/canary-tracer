export type RootPackageManifest = {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

export function readRootPackageManifest(): RootPackageManifest {
  throw new Error("#78: not built");
}
