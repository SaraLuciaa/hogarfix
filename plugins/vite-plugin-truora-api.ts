import type { Connect } from "vite";
import type { Plugin } from "vite";
import { loadEnv } from "vite";

import { getTruoraTokenFromServer } from "../server/truora-token.js";

function mergeServerEnv(
  loaded: Record<string, string>,
): NodeJS.ProcessEnv {
  return { ...process.env, ...loaded } as NodeJS.ProcessEnv;
}

function truoraApiMiddleware(
  getEnv: () => Record<string, string>,
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url?.split("?")[0];
    if (url !== "/api/truora-token" || req.method !== "POST") {
      next();
      return;
    }

    const origin = req.headers.origin;
    try {
      const merged = mergeServerEnv(getEnv());
      const { code } = await getTruoraTokenFromServer(merged, {
        origin: origin ?? null,
      });
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ code }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error";
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: msg }));
    }
  };
}

export function truoraApiPlugin(): Plugin {
  let getEnv: () => Record<string, string> = () => ({});

  return {
    name: "truora-api",
    configResolved(config) {
      const loaded = loadEnv(config.mode, config.root, "");
      getEnv = () => loaded;
    },
    configureServer(server) {
      server.middlewares.use(truoraApiMiddleware(getEnv));
    },
    configurePreviewServer(server) {
      server.middlewares.use(truoraApiMiddleware(getEnv));
    },
  };
}
