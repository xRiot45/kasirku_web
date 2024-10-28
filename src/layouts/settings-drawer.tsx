'use client';

import ThemeSwitcher from '@/layouts/settings/theme-switcher';
import SimpleBar from '@/ui/simplebar';

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          {/* <AppDirection />
          <LayoutSwitcher />
          <ColorOptions /> */}
        </div>
      </SimpleBar>
    </>
  );
}
