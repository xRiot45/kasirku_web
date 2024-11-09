'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import KasirLayouts from '@/layouts/kasir-layouts';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <KasirLayouts>{children}</KasirLayouts>;
}
