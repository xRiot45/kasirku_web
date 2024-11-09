'use client';

import SearchWidget from '@//shared/search/search';
import HamburgerButton from '@/layouts/hamburger-button';
import HeaderMenuRight from '@/layouts/header-menu-right';
import Sidebar from '@/layouts/admin-layouts/sidebar';
import StickyHeader from '@/layouts/sticky-header';
import LogoIcon from '@public/images/logo-icon.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Image
            src={LogoIcon}
            alt="Logo Kasirku"
            width={100}
            height={100}
            priority
            className=""
          />
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
