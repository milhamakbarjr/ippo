import { HeadContent, Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import { TopbarIppo } from "@/pages/dashboard/components/topbar-ippo";
import { dashboardNavItems, dashboardFooterItems } from "@/pages/dashboard/components/dashboard-nav-items";
import { QueryProvider } from "@/providers/query-provider";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

/** Routes that show the top navigation bar */
const TOPBAR_PREFIXES = ['/', '/profile', '/learning', '/letters'];

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

function AppShell() {
    const { pathname } = useLocation();
    const { data: session } = authClient.useSession();
    const isAuthenticated = !!session?.user;
    const showTopbar = TOPBAR_PREFIXES.some(
        (prefix) => pathname === prefix || (prefix !== '/' && pathname.startsWith(prefix + '/'))
    );
    const activeUrl = dashboardNavItems.find(
        (item) => item.href === pathname || (item.href !== '/' && item.href != null && pathname.startsWith(item.href + '/')),
    )?.href ?? pathname;

    if (!showTopbar) return <Outlet />;

    return (
        <div className="min-h-dvh bg-primary">
            <TopbarIppo
                activeUrl={activeUrl}
                items={dashboardNavItems}
                footerItems={dashboardFooterItems}
                isAuthenticated={isAuthenticated}
            />
            <Outlet />
        </div>
    );
}

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
                            <AppShell />
                        </RouteProvider>
                    </QueryProvider>
                </ThemeProvider>
                <Toaster position="bottom-center" richColors />
                <Scripts />
            </body>
        </html>
    );
}
