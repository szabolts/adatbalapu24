'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Session } from "next-auth";
import { FaUserEdit, FaKey } from "react-icons/fa";


export default function ProfileNavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Edit profile', href: `/profile`, icon: FaUserEdit },
    {
      name: 'Change password',
      href: `/profile/pw-change`,
      icon: FaKey,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-4 rounded-xl p-2 font-medium  dark:hover:bg-neutral-900 hover:bg-neutral-200 transition-all duration-500',
              {
                'dark:bg-neutral-800 bg-neutral-300  font-bold ': pathname === link.href,
              }
            )}
          >
            <div className="flex items-center pl-1.5">
              <LinkIcon size={20} />
            </div>

            <div className={`flex-grow transition-opacity duration-500`}>
              {link.name}
            </div>
          </Link>
        );
      })}
    </>
  );
}
