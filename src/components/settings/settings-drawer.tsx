"use client";

import SimpleBar from "@/components/ui/simplebar";
import ThemeSwitcher from "./theme-switcher";

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          {/* <ColorOptions /> */}
        </div>
      </SimpleBar>
    </>
  );
}
