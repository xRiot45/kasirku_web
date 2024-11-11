'use client';

import { logoutRequest } from '@/app/auth/signin/core/_requests';
import { routes } from '@/config/routes';
import { IUsers } from '@/services/users/_models';
import { getDataUser } from '@/services/users/_requests';
import cn from '@/utils/class-names';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Avatar, Button, Popover, Text, Title } from 'rizzui';

export default function ProfileMenu({
  buttonClassName,
  username = false,
}: {
  buttonClassName?: string;
  username?: boolean;
}) {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getDataUser(),
  });

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src={`${process.env.API_URL}/${data?.photo ?? ''}`}
            name={data?.full_name ?? '-'}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              {data?.full_name ?? '-'}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu data={data} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: 'My Profile',
    href: '/profile',
  },
];

function DropdownMenu(props: { data: IUsers | undefined }) {
  const { data } = props;
  const queryClient = useQueryClient();
  const router = useRouter();

  const useLogout = () => {
    return useMutation({
      mutationFn: logoutRequest,
      onSuccess: () => {
        queryClient.clear();
        toast.success('Sign Out Successfully!');
        router.push('/auth/signin');
      },
      onError: () => {
        toast.error('Sign Out Failed!');
      },
    });
  };

  const { mutate: logout } = useLogout();

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={`${process.env.API_URL}/${data?.photo ?? ''}`}
          name={data?.full_name ?? '-'}
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {data?.full_name}
          </Title>
          <Text className="text-xs text-gray-600">{data?.email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-red-600 outline-none focus-within:text-gray-600 hover:text-gray-800 focus-visible:ring-0"
          variant="text"
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
