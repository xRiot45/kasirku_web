'use client';

import Image from 'next/image';
import SocialItems from '@/components/ui/social-shares';
import NotFoundImg from '@public/images/not-found.png';
import { Title, Button } from 'rizzui';
import { PiHouseLineBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import { useRouter } from 'next/navigation';

export const metadata = {
  ...metaObject('Not Found Page'),
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto text-center">
          <Image
            src={NotFoundImg}
            alt="not found"
            width={500}
            height={500}
            className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
          />
          <Title
            as="h1"
            className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
          >
            Sorry, page not found
          </Title>
          <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
            The page you are looking for may have been deleted or is not
            available.
            <br className="hidden sm:inline-block" />
            Please return to the previous page or return to the main page.
          </p>

          <Button
            as="span"
            size="xl"
            color="primary"
            className="mt-8 h-12 w-full cursor-pointer bg-amber-600 px-4 hover:bg-amber-700 xl:h-14 xl:px-6"
            onClick={() => router.back()}
          >
            <PiHouseLineBold className="mr-1.5 text-lg" />
            Return to previous page
          </Button>
        </div>
      </div>
      <SocialItems />
    </div>
  );
}
