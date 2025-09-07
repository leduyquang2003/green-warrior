"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-primary text-white">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logos */}
          <div className="flex items-center gap-4">
          <Image
              src="/logo-oucru-dark.png"
              alt="OUCRU"
              width={60}
              height={60}
              className="object-cover w-14 h-14"
            />
            <Image
              src="/logo-dart.png"
              alt="DART"
              width={60}
              height={60}
              className="object-cover w-14 h-14"
            />
          </div>

          {/* Navigation Links */}
          <nav className="md:flex gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "hover:underline",
                  pathname === item.href && "text-secondary font-bold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Login Button */}
        <div>
          <Button className="bg-secondary hover:bg-orange-600 text-white font-semibold">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
