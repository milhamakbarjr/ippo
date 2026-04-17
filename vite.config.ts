import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
    plugins: [
        // Cloudflare Workers plugin only during build — local dev uses Node.js SSR
        // which works correctly. The workerd runtime in dev has a known issue with
        // TanStack Start's virtual module resolution.
        command === "build" && cloudflare({ viteEnvironment: { name: "ssr" } }),
        tanstackStart(),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));
