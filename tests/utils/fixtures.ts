import { test as base, expect } from "@playwright/test";

export type ContentManifest = { blogSlugsByLang: Record<string, string[]> };

type Fixtures = {
  defaultLang: string;
  baseURL: string;
  to: (path?: string, lang?: string) => string;
  manifest: ContentManifest;
};

export const test = base.extend<Fixtures>({
  defaultLang: ["en", { scope: "test" }],

  baseURL: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, testInfo) => {
      await use(testInfo.project.use.baseURL!);
    },
    { scope: "test" },
  ],

  to: [
    async ({ baseURL, defaultLang }, use) => {
      const builder = (path = "", lang = defaultLang) =>
        new URL(`/${lang}/${path}`, baseURL).toString();
      await use(builder);
    },
    { scope: "test" },
  ],

  manifest: [
    async ({ request }, use) => {
      const response = await request.get("/api/content-manifest.json");
      expect(response.ok()).toBeTruthy();
      const manifest: ContentManifest = await response.json();
      await use(manifest);
    },
    { scope: "test" },
  ],
});

export { expect };
