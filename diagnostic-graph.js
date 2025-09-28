export default function diagnosticGraph() {
  const seenResolutions = new Map();

  return {
    name: "diagnostic-graph",
    enforce: "pre",
    apply: "serve",

    // 1) Final merged config
    configResolved(cfg) {
      const pick = (o, ks) => Object.fromEntries(ks.map((k) => [k, o[k]]));
      console.log("[cfg.root]", cfg.root);
      console.log("[cfg.mode]", cfg.mode, "command:", cfg.command);
      console.log("[cfg.resolve.alias]", cfg.resolve.alias);
      console.log("[cfg.ssr.noExternal]", cfg.ssr?.noExternal);
      console.log(
        "[cfg.optimizeDeps]",
        pick(cfg.optimizeDeps ?? {}, ["include", "exclude", "esbuildOptions"])
      );
      console.log("[cfg.define keys]", Object.keys(cfg.define ?? {}));
      console.log("[cfg.envPrefix]", cfg.envPrefix);

      console.log(
        "[cfg.plugins]",
        cfg.plugins.map((p) => p.name)
      );
    },

    // 2) See how ids resolve
    async resolveId(source, importer, options) {
      const r = await this.resolve(source, importer, {
        skipSelf: true,
        ...options
      });
      if (r) {
        seenResolutions.set(r.id, {
          importer,
          plugin: this?.meta?.watchMode ? "dev" : "build"
        });
        if (/^(astro:|virtual:|\/@fs\/)/.test(source) || source.startsWith("@/")) {
          console.log("[resolveId]", {
            source,
            importer,
            resolved: r.id,
            ssr: !!options?.ssr
          });
        }
        return r;
      }
      return null;
    },

    // 3) Measure transform effect & which plugin touched the file
    transform(code, id, opts) {
      if (/src\/content\/blog/.test(id) || id.includes("astro:content")) {
        console.log("[transform]", { id, ssr: opts?.ssr, length: code.length });
      }
      return null;
    },

    // 4) Dev-server internals (module graph, middlewares, file events)
    configureServer(server) {
      const routes = server.middlewares.stack.map((l) => l.route || "(middleware)").filter(Boolean);
      console.log("[server.fs.allow]", server.config.server.fs.allow);
      console.log("[middlewares]", routes);

      // Watch file changes
      server.watcher.on("all", (event, path) => {
        if (/\.(astro|mdx?|tsx?|jsx?)$/.test(path)) {
          console.log(`[watcher] ${event}: ${path}`);
        }
      });

      // Quick peek at moduleGraph lookups
      server.ws.on("connection", () => {
        const size = server.moduleGraph.idToModuleMap.size;
        console.log("[moduleGraph] entries:", size);
      });
    },

    // 5) Hot updates (when running locally with --watch)
    handleHotUpdate(ctx) {
      if (/\.(astro|mdx?|tsx?|jsx?)$/.test(ctx.file)) {
        const deps = ctx.modules.flatMap((m) => Array.from(m.importers || [])).map((m) => m.id);
        console.log("[HMR]", ctx.file, "-> dependents:", deps.slice(0, 5));
      }
      return ctx.modules;
    },

    // 6) Build-time graph
    buildStart() {
      console.log("[buildStart] building with", this.meta.watchMode ? "watch" : "once");
    },
    moduleParsed(info) {
      console.log("[parsed]", info.id);
      console.log("  imports:", info.importedIds);
      console.log("  dynamic imports:", info.dynamicallyImportedIds);
      console.log("  exports:", info.exportedBindings);
    },
    generateBundle(_, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk") {
          console.log("[chunk]", fileName);
          console.log("  imports:", chunk.imports);
          console.log("  modules:", Object.keys(chunk.modules).slice(0, 5));
        }
      }
    }
  };
}
