'use client';

import { useEffect } from 'react';
// import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import { useDirection } from '@/hooks/use-direction';
import CogSolidIcon from '@/components/icons/cog-solid';
import { ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import DrawerHeader from './drawer-header';
import { usePresets } from '@/config/color-presets';
import {
  useApplyColorPreset,
  useColorPresets,
} from '@/layouts/settings/use-theme-color';
import { useDrawer } from '@/shared/drawer-views/use-drawer';
const SettingsDrawer = dynamic(() => import('./settings-drawer'), {
  ssr: false,
});

export default function SettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();
  // const { theme } = useTheme();

  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  // to set html dir attribute on direction change
  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader onClose={closeDrawer} />
              <SettingsDrawer />
            </>
          ),
          placement: 'right',
          containerClassName: 'max-w-[420px]',
        })
      }
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon strokeWidth={1.8} className="h-[22px] w-auto" />
      )}
    </ActionIcon>
  );
}
