import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TopbarIppo } from '@/pages/dashboard/components/topbar-ippo';
import { dashboardNavItems, dashboardFooterItems } from '@/pages/dashboard/components/dashboard-nav-items';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const { pathname } = useLocation();
  const activeUrl = dashboardNavItems.find(
    (item) => item.href === pathname || (item.href !== '/' && item.href != null && pathname.startsWith(item.href + '/')),
  )?.href ?? pathname;

  return (
    <div className="min-h-dvh bg-primary">
      <TopbarIppo
        activeUrl={activeUrl}
        items={dashboardNavItems}
        footerItems={dashboardFooterItems}
        showAccountCard
      />
      <Outlet />
    </div>
  );
}
