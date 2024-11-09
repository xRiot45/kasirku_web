'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import KokiLayout from '@/layouts/koki-layouts';

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

  return <KokiLayout>{children}</KokiLayout>;
}
