export type RootPackage = {
  name?: string;
  engines?: { node?: string };
  [key: string]: unknown;
};

export function readRootPackage(): RootPackage {
  throw new Error("#90: not built");
}
