import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default Cloudflare config for OpenNext. The socials hub is a static single
// page, so the default (no incremental cache binding) is enough.
export default defineCloudflareConfig();
