import { LAYOUT_OPTIONS } from '@/config/enums';
// import logoIconImg from '@public/logo-short.svg';
// import logoImg from '@public/logo.svg';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Kasirku',
  description: `Kasirku is a cashier web application designed to help small to medium businesses manage sales transactions efficiently and easily.`,
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Kasirku` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Kasirku` : title,
      description,
      url: '#',
      siteName: '#',
      images: {
        url: '#',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};