'use client';

import Sidebar from '@/layouts/admin-layouts/sidebar';
import HamburgerButton from '@/layouts/hamburger-button';
import StickyHeader from '@/layouts/sticky-header';
import LogoIcon from '@public/images/logo-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import ProfileMenu from '../profile-menu';
import SettingsButton from '../settings-button';

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

        {/* <SearchWidget /> */}
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}

function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}
