import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import type { Plugin } from "esbuild";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config) as Plugin],
    })
  );

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://thinking-tester-contact-list.herokuapp.com/",
    specPattern: "**/*.feature",
    setupNodeEvents,
    viewportWidth: 840,
    viewportHeight: 840,
  },
});
