import { type PropsWithChildren } from "react";
import { RouterProvider } from "react-aria-components";
import { useNavigate } from "@tanstack/react-router";
import type { NavigateOptions } from "@tanstack/react-router";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export const RouteProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();

    // react-aria-components passes `to` as string; TanStack Router navigate expects
    // a literal route union. Cast is safe — runtime value is always a valid route path.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNavigate = (to: string, options?: NavigateOptions) => navigate({ to: to as any, ...options });

    return (
        <RouterProvider navigate={handleNavigate}>
            {children}
        </RouterProvider>
    );
};
