"use client"
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export function HeaderButtons() {
    const pathname = usePathname();
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row mx-auto gap-4">
          <Link className={`hover:scale-105 duration-50 text-lg font-semibold ${pathname === "/" ? "text-purple-500" : ""}`} href="/">Images</Link>
          <Link className={`hover:scale-105 duration-50 text-lg font-semibold ${pathname === "/categories" ? "text-purple-500" : ""}`} href="/categories" >Categories</Link>
        </div>
    );
}