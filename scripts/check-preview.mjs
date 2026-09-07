// Run against `npm run dev`, especially after `npm run build` has completed.
// This catches production builds overwriting the running preview's artifacts.
import assert from "node:assert/strict";

const origin = "http://localhost:3000";
for (const path of [
  "/",
  "/projects",
  "/about",
  "/writings",
  "/Jatin_Awankar_Resume.pdf",
]) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path} returned ${response.status}`);
  if (path === "/") {
    const html = await response.text();
    const scripts = [...html.matchAll(/<script[^>]+src="([^\"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"))
      .filter((src) => src.startsWith("/_next/"));
    assert.ok(scripts.length, "Homepage must include its client scripts");
    for (const src of scripts) {
      const asset = await fetch(new URL(src, origin));
      assert.equal(
        asset.status,
        200,
        `Client script returned ${asset.status}: ${src}`,
      );
    }
  }
  console.log(`PASS ${path}`);
}
