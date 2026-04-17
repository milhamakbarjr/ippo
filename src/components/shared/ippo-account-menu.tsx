import { LogOut01, Settings01, User01 } from '@untitledui/icons';
import { useNavigate } from '@tanstack/react-router';
import { Button as AriaButton } from 'react-aria-components';
import { Avatar } from '@/components/base/avatar/avatar';
import { AvatarLabelGroup } from '@/components/base/avatar/avatar-label-group';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import { ThemeSelector } from '@/components/shared/theme-selector';
import { authClient } from '@/lib/auth-client';
import { cx } from '@/utils/cx';

interface IppoAccountMenuProps {
  /** avatar = just the icon button (desktop topbar), card = full email card (sidebar/mobile) */
  variant?: 'avatar' | 'card';
}

export function IppoAccountMenu({ variant = 'avatar' }: IppoAccountMenuProps) {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const email = session?.user?.email ?? '';

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/auth/login';
  };

  return (
    <Dropdown.Root>
      {variant === 'avatar' ? (
        <AriaButton
          aria-label="Open account menu"
          className={({ isFocusVisible }) =>
            cx(
              'cursor-pointer rounded-full outline-focus-ring transition duration-100 ease-linear',
              isFocusVisible && 'outline-2 outline-offset-2',
            )
          }
        >
          <Avatar size="sm" alt="Account" />
        </AriaButton>
      ) : (
        <AriaButton
          className={({ isPressed, isFocusVisible }) =>
            cx(
              'relative w-full cursor-pointer rounded-lg bg-primary p-2 text-left inset-ring-1 inset-ring-border-secondary outline-focus-ring transition duration-100 ease-linear',
              (isPressed || isFocusVisible) && 'outline-2 outline-offset-2',
            )
          }
        >
          <AvatarLabelGroup
            size="sm"
            title={email}
            subtitle="My account"
          />
          <div className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md">
            <User01 className="size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
          </div>
        </AriaButton>
      )}

      <Dropdown.Popover placement={variant === 'card' ? 'top right' : 'bottom end'} offset={8}>
        {/* Email header */}
        <div className="flex items-center gap-3 border-b border-secondary px-4 py-3">
          <Avatar size="sm" alt="Account" />
          <p className="truncate text-sm font-semibold text-secondary">{email || 'Account'}</p>
        </div>

        {/* Theme selector */}
        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
          <span className="text-sm font-semibold text-secondary">Theme</span>
          <ThemeSelector />
        </div>

        {/* Menu items */}
        <Dropdown.Menu
          onAction={(key) => {
            if (key === 'view-profile' || key === 'account-settings') {
              void navigate({ to: '/profile' });
            } else if (key === 'sign-out') {
              void handleSignOut();
            }
          }}
        >
          <Dropdown.Item id="view-profile" icon={User01}>
            View profile
          </Dropdown.Item>
          <Dropdown.Item id="account-settings" icon={Settings01}>
            Account settings
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item id="sign-out" icon={LogOut01}>
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
