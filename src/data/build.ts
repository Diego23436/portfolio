import { execSync } from "node:child_process";
import pkg from "../../package.json";

/**
 * Build info for the footer line: "v2.0.0 · build 1a2b3c4 · deployed from Douala".
 * The hash is the commit being built: Cloudflare gives it in CF_PAGES_COMMIT_SHA, locally we ask git.
 */
function commitHash(): string {
  const fromCloudflare = process.env.CF_PAGES_COMMIT_SHA;
  if (fromCloudflare) return fromCloudflare.slice(0, 7);
  try {
    const out = execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    return out || "local";
  } catch {
    return "local";
  }
}

export const build = {
  version: `v${pkg.version}`,
  hash: commitHash(),
};
