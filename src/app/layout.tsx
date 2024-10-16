import { siteConfig } from '@/config/site.config';
import GlobalDrawer from '@/shared/drawer-views/container';
import GlobalModal from '@/shared/modal-views/container';
import { ThemeProvider } from '@/shared/theme-provider';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './queryProvider';

// styles
import '@/styles/fonts.css';
import '@/styles/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider>
            {children}
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}