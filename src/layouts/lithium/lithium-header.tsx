'use client';

import LogoIcon from '@public/images/logo-icon.png';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/layouts/settings-button';
import StickyHeader from '@/layouts/sticky-header';
import Link from 'next/link';
import { PiGearDuotone } from 'react-icons/pi';
import LogoImg from '@public/images/logo.png';
import Image from 'next/image';

function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {' '}
      <SettingsButton className="rounded-full text-gray-700 shadow-none backdrop-blur-none hover:text-gray-1000 dark:bg-gray-100/0 3xl:h-10 3xl:w-10">
        <PiGearDuotone className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton>
      <ProfileMenu
        buttonClassName="w-auto sm:w-auto p-1 border border-gray-300"
        avatarClassName="!w-7 !h-7 sm:!h-8 sm:!w-8"
      />
    </div>
  );
}

export default function Header() {
  return (
    <StickyHeader
      className={'z-[990] justify-between 2xl:py-5 2xl:pl-6 3xl:px-8'}
    >
      <div className="hidden items-center gap-3 xl:flex">
        <Link
          aria-label="Site Logo"
          href={'/'}
          className="me-4 hidden w-[155px] shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:block"
        >
          <Image
            src={LogoImg}
            alt="Kasirku"
            width={180}
            height={180}
            priority
            className=""
          />
        </Link>
        {/* <HeaderMenuLeft /> */}
      </div>
      <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
        <div className="flex w-full max-w-2xl items-center xl:w-auto">
          {/* <HamburgerButton
            view={<Sidebar className="static w-full 2xl:w-full" />}
          /> */}
          <Link
            aria-label="Site Logo"
            href={'/'}
            className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
          >
            <Image
              src={LogoIcon}
              alt="Kasirku"
              width={180}
              height={180}
              priority
              className=""
            />
          </Link>
        </div>
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}
