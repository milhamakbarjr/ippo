import { X as CloseIcon, Menu02 } from '@untitledui/icons';
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from 'react-aria-components';
import { IppoLogo } from '@/components/foundations/logo/ippo-logo';
import { NavButton } from '@/components/application/app-navigation/base-components/nav-button';
import { NavItemBase } from '@/components/application/app-navigation/base-components/nav-item';
import { NavList } from '@/components/application/app-navigation/base-components/nav-list';
import { IppoAccountMenu } from '@/components/shared/ippo-account-menu';
import { cx } from '@/utils/cx';
import type { NavItemType } from '@/components/application/app-navigation/config';

interface TopbarIppoProps {
  activeUrl?: string;
  items: NavItemType[];
  footerItems?: NavItemType[];
  showAccountCard?: boolean;
}

export function TopbarIppo({ activeUrl, items, footerItems = [], showAccountCard = true }: TopbarIppoProps) {
  return (
    <>
      {/* ── Mobile header (< lg) ── */}
      <AriaDialogTrigger>
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-secondary bg-primary px-4 lg:hidden">
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
                <AriaDialog className="h-dvh outline-hidden focus:outline-hidden">
                  <aside className="flex h-full flex-col justify-between overflow-auto bg-primary pt-4">
                    <div className="px-4">
                      <IppoLogo className="h-6 text-base" />
                    </div>

                    <NavList activeUrl={activeUrl} items={items} />

                    <div className="mt-auto flex flex-col gap-3 px-4 py-4">
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
                      {showAccountCard && <IppoAccountMenu variant="card" />}
                    </div>
                  </aside>
                </AriaDialog>
              </AriaModal>
            </>
          )}
        </AriaModalOverlay>
      </AriaDialogTrigger>

      {/* ── Desktop header (lg+) ── */}
      <header className="sticky top-0 z-40 hidden lg:flex lg:h-16 lg:w-full lg:items-center lg:border-b lg:border-secondary lg:bg-primary">
        <div className="flex w-full items-center gap-6 px-6">
          {/* Logo */}
          <a
            href="/"
            aria-label="Go to homepage"
            className="shrink-0 rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <IppoLogo className="h-6 text-base" />
          </a>

          {/* Primary nav items */}
          <nav>
            <ul className="flex items-center gap-0.5">
              {items.map((item) => (
                <li key={item.label}>
                  <NavButton
                    href={item.href}
                    icon={item.icon}
                    current={item.href === activeUrl}
                    tooltipPlacement="bottom"
                  >
                    {item.label}
                  </NavButton>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-3">
            {showAccountCard && <IppoAccountMenu variant="avatar" />}
          </div>
        </div>
      </header>
    </>
  );
}
