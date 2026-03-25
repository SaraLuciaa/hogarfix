import type { Connect } from "vite";
import type { Plugin } from "vite";
import { loadEnv } from "vite";

import { getTruoraTokenFromServer } from "../server/truora-token.js";
import { sendWhatsAppOutbound } from "../server/truora-whatsapp.js";

function mergeServerEnv(
  loaded: Record<string, string>,
): NodeJS.ProcessEnv {
  return { ...process.env, ...loaded } as NodeJS.ProcessEnv;
}

function readJsonBody(req: Connect.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error("Invalid JSON body")); }
    });
    req.on("error", reject);
  });
}

function truoraApiMiddleware(
  getEnv: () => Record<string, string>,
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url?.split("?")[0];

    if (url === "/api/truora-token" && req.method === "POST") {
      try {
        const merged = mergeServerEnv(getEnv());
        const { api_key } = await getTruoraTokenFromServer(merged);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ api_key }));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error";
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: msg }));
      }
      return;
    }

    if (url === "/api/truora-whatsapp" && req.method === "POST") {
      try {
        const merged = mergeServerEnv(getEnv());
        const body = await readJsonBody(req);
        const result = await sendWhatsAppOutbound(merged, {
          phone_number: String(body.phone_number ?? ""),
          country_code: String(body.country_code ?? ""),
        });
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error";
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: msg }));
      }
      return;
    }

    next();
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
