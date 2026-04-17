import type { ReactNode } from 'react';
import { X as CloseIcon, Menu02 } from '@untitledui/icons';
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from 'react-aria-components';
import { IppoLogo } from '@/components/foundations/logo/ippo-logo';
import { IppoAccountMenu } from '@/components/shared/ippo-account-menu';
import { NavItemBase } from '@/components/application/app-navigation/base-components/nav-item';
import { NavList } from '@/components/application/app-navigation/base-components/nav-list';
import { cx } from '@/utils/cx';
import type { NavItemType } from '@/components/application/app-navigation/config';

interface SidebarIppoProps {
  activeUrl?: string;
  items: NavItemType[];
  footerItems?: NavItemType[];
  featureCard?: ReactNode;
  showAccountCard?: boolean;
  hideBorder?: boolean;
  className?: string;
}

export const SIDEBAR_WIDTH = 280;

function SidebarContent({
  activeUrl,
  items,
  footerItems = [],
  featureCard,
  showAccountCard = true,
  hideBorder = false,
  className,
}: SidebarIppoProps) {
  return (
    <aside
      style={{ '--width': `${SIDEBAR_WIDTH}px` } as React.CSSProperties}
      className={cx(
        'flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-5',
        !hideBorder && 'border-secondary md:border-r',
        className,
      )}
    >
      <div className="flex flex-col gap-5 px-4 lg:px-5">
        <IppoLogo className="h-6 text-base" />
      </div>

      <NavList activeUrl={activeUrl} items={items} />

      <div className="mt-auto flex flex-col gap-3 px-4 py-4 lg:py-5">
        {footerItems.length > 0 && (
          <ul className="flex flex-col">
            {footerItems.map((item) => (
              <li key={item.label} className="py-px">
                <NavItemBase
                  badge={item.badge}
                  icon={item.icon}
                  href={item.href}
                  type="link"
                  current={item.href === activeUrl}
                >
                  {item.label}
                </NavItemBase>
              </li>
            ))}
          </ul>
        )}
        {featureCard}
        {showAccountCard && <IppoAccountMenu variant="card" />}
      </div>
    </aside>
  );
}

export function SidebarIppo(props: SidebarIppoProps) {
  const content = <SidebarContent {...props} />;

  return (
    <>
      {/* Mobile header navigation */}
      <AriaDialogTrigger>
        <header className="flex h-14 items-center justify-between border-b border-secondary bg-primary p-3 pl-4 lg:hidden">
          <IppoLogo className="h-6 text-base" />
          <AriaButton
            aria-label="Expand navigation menu"
            className="group flex items-center justify-center rounded-lg bg-primary p-2 text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Menu02 className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
            <CloseIcon className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
          </AriaButton>
        </header>

        <AriaModalOverlay
          isDismissable
          className={({ isEntering, isExiting }) =>
            cx(
              'fixed inset-0 z-50 cursor-pointer bg-overlay/70 pr-16 backdrop-blur-md lg:hidden',
              isEntering && 'duration-300 ease-in-out animate-in fade-in',
              isExiting && 'duration-200 ease-in-out animate-out fade-out',
            )
          }
        >
          {({ state }) => (
            <>
              <AriaButton
                aria-label="Close navigation menu"
                onPress={() => state.close()}
                className="fixed top-2.5 right-3 flex cursor-pointer items-center justify-center rounded-lg p-2 text-fg-white/70 outline-focus-ring hover:bg-white/10 hover:text-fg-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <CloseIcon className="size-6" />
              </AriaButton>
              <AriaModal className="w-full max-w-74 cursor-auto will-change-transform">
                <AriaDialog className="h-dvh outline-hidden focus:outline-hidden">{content}</AriaDialog>
              </AriaModal>
            </>
          )}
        </AriaModalOverlay>
      </AriaDialogTrigger>

      {/* Desktop sidebar (fixed) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

      {/* Spacer for fixed sidebar */}
      <div
        style={{ paddingLeft: SIDEBAR_WIDTH }}
        className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
      />
    </>
  );
}
