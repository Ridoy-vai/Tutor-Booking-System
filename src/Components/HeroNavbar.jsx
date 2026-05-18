"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

// import {
//   ArrowRightFromSquare,
//   Gear,
//   Persons,
//   Menu,
//   X,
// } from "@gravity-ui/icons";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownPopover, DropdownSection, DropdownTrigger } from "@heroui/react";
import { Menu, X } from "lucide-react";

export default function HeroNavbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const logedin = !!user;

  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Tutors", href: "/tutors" },
    ...(logedin
      ? [
          { label: "Add Tutor", href: "/addTutor" },
          { label: "My Tutors", href: "/myTutors" },
          { label: "Booked Sessions", href: "/bookedSessions" },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut({ callbackURL: "/" });
  };

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="text-xl font-bold">Hero</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Auth */}
          {!logedin ? (
            <>
              <Link href="/authentication/login" className="text-gray-600">
                Login
              </Link>

              <Link href="/authentication/signup" className="text-gray-600">
                Signup
              </Link>
            </>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                  className="cursor-pointer"
                />
              </DropdownTrigger>

              <DropdownPopover>
                <DropdownMenu>

                  <DropdownSection showDivider>
                    <DropdownItem key="profile">
                      <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownItem key="dashboard">Dashboard</DropdownItem>

                  <DropdownItem key="settings">
                    <div className="flex justify-between">
                      Settings 
                    </div>
                  </DropdownItem>

                  <DropdownItem key="team">
                    <div className="flex justify-between">
                      Create Team 
                    </div>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    className="text-red-500"
                    onClick={handleSignOut}
                  >
                    <div className="flex justify-between">
                      Logout 
                    </div>
                  </DropdownItem>

                </DropdownMenu>
              </DropdownPopover>
            </Dropdown>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}