import { HeadContent, Outlet, ScrollRestoration, createRootRoute } from "@tanstack/react-router";
import { Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "description", content: "Ippo (一歩) — Free, guided JLPT learning for Indonesian learners" },
            { name: "theme-color", content: "#7f56d9" },
        ],
        links: [
            { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap",
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    // Hardcoded static string — no user input, no XSS risk.
    const foucScript = `(function(){var t=localStorage.getItem("ui-theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark-mode")}})()`;

    return (
        <html lang="id">
            <head>
                <HeadContent />
            </head>
            <body className="size-full bg-primary antialiased">
                {/* Inline script prevents dark mode flash on load (FOUC) */}
                <script dangerouslySetInnerHTML={{ __html: foucScript }} />
                <ThemeProvider>
                    <QueryProvider>
                        <RouteProvider>
                            <Outlet />
                        </RouteProvider>
                    </QueryProvider>
                </ThemeProvider>
                <Toaster position="bottom-center" richColors />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
