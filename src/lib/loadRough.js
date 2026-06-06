"use client";

// Module-level promise cache for the rough.js bundle. The first component to
// mount triggers the dynamic import; every subsequent component awaits the
// same promise — no extra network/parse work per instance.
let cache;

export function loadRough() {
  if (!cache) {
    cache = import("roughjs/bin/rough").then((m) => m.default);
  }
  return cache;
}
