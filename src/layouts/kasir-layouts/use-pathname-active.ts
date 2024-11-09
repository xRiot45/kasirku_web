'use client';
import { usePathname } from 'next/navigation';

import type { DropdownItemType, SubMenuItemType } from './menu-items';

export function useActivePathname() {
  const pathname = usePathname();

  function isActive(belongsTo: string | DropdownItemType[]): boolean {
    let isActive: boolean = false;
    if (typeof belongsTo === 'string') {
      isActive = pathname === belongsTo;
    } else {
      isActive = belongsTo?.some(
        (item) =>
          item?.href === pathname ||
          item?.subMenuItems?.some(
            (subItem: SubMenuItemType) => subItem.href === pathname
          )
      );
    }
    return isActive;
  }

  return {
    isActive,
  };
}
