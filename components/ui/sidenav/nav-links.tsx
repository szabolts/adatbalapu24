'use client';

import { MdHome } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserGroup } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import clsx from 'clsx';
import { Session } from "next-auth";


export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: `/dashboard`, icon: MdHome },
    {
      name: 'Users',
      href: `/dashboard/users`,
      icon: FaUserGroup,
    },
    { name: 'Pictures', href: `/dashboard/pictures`, icon: MdInsertPhoto },
    { name: 'Categories', href: `/dashboard/categories`, icon: MdCategory },
  ];

  return (
    <div className="flex flex-col gap-1">
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
    </div>
  );
}
