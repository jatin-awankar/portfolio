import assert from "node:assert/strict";
import { test } from "node:test";
import { getOpenSourcePRs } from "../lib/github.ts";

const json = (value) => Response.json(value);
const item = (number) => ({
  repository_url: "https://api.github.com/repos/example/project",
  html_url: `https://github.com/example/project/pull/${number}`,
  number,
  title: `Contribution ${number}`,
});

test("featured merges survive a total GitHub outage", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new Error("offline"); });
  const prs = await getOpenSourcePRs();
  assert.deepEqual(prs.map((pr) => [pr.url.split("/").at(-1), pr.status]), [
    ["2261", "Merged"], ["2276", "Merged"],
  ]);
});

test("search paginates and direct featured results take precedence", async (t) => {
  const pages = [];
  t.mock.method(globalThis, "fetch", async (input) => {
    const url = new URL(input);
    if (url.pathname.includes("/pulls/")) {
      return json({ merged: true, state: "closed", html_url: input.replace("api.github.com/repos/", "github.com/").replace("/pulls/", "/pull/") });
    }
    const query = url.searchParams.get("q");
    assert.ok(query.includes("is:public"));
    assert.ok(query.includes("-user:jatin-awankar"));
    assert.ok(query.includes("-org:firstcontributions"));
    if (query.includes("is:open")) return json({ items: [], total_count: 0 });
    const page = Number(url.searchParams.get("page"));
    pages.push(page);
    return json({
      total_count: 101,
      items: page === 1 ? Array.from({ length: 100 }, (_, i) => item(i + 1)) : [item(101)],
    });
  });
  const prs = await getOpenSourcePRs();
  assert.deepEqual(pages, [1, 2]);
  assert.equal(prs.length, 103);
  assert.equal(prs[0].url, "https://github.com/openstatusHQ/openstatus/pull/2261");
  assert.equal(prs.at(-1).url, item(101).html_url);
});

test("later-page failure retains earlier results and one failed featured request falls back", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => {
    const url = new URL(input);
    if (url.pathname.endsWith("/2276")) throw new Error("offline");
    if (url.pathname.endsWith("/2261")) return json({ merged: false, state: "closed" });
    if (url.searchParams.get("q").includes("is:open")) return new Response(null, { status: 503 });
    if (url.searchParams.get("page") === "2") throw new Error("timeout");
    return json({ total_count: 101, items: Array.from({ length: 100 }, (_, i) => item(i + 1)) });
  });
  const prs = await getOpenSourcePRs();
  assert.equal(prs.length, 101);
  assert.ok(!prs.some((pr) => pr.url.endsWith("/2261")));
  assert.equal(prs[0].url, "https://github.com/openstatusHQ/openstatus/pull/2276");
});
