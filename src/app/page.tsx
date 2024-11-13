import SocialItems from '@/components/ui/social-shares';
import { metaObject } from '@/config/site.config';
import IconImg from '@public/images/welcome.png';
import Image from 'next/image';
import Link from 'next/link';
import { MdLogin } from 'react-icons/md';
import { Button, Text, Title } from 'rizzui';

export const metadata = {
  ...metaObject('Beranda'),
};

export default function WelcomePage() {
  return (
    <>
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="container mx-auto flex w-full flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
          <div className="mt-10 2xl:mt-0">
            <Title
              as="h2"
              className="mb-3 text-[30px] font-black leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[42px] 3xl:text-5xl 3xl:leading-snug"
            >
              Welcome To <span className="italic">Kasirku</span>
            </Title>
            <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              <strong className="italic text-amber-500">Kasirku</strong> is a
              cashier web application designed to help small to medium
              businesses manage sales transactions efficiently and easily.
            </Text>
            <div className="mt-8 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start xl:gap-6">
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="h-12 w-full bg-amber-500 px-4 hover:bg-amber-700 xl:h-14 xl:px-6"
                >
                  <MdLogin className="me-1.5 h-[17px] w-[17px] text-white" />
                  Sign In Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={IconImg}
              alt="Late Img"
              className="aspect-[632/630] max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
            />
          </div>
        </div>
      </div>
      <SocialItems />
    </>
  );
}
