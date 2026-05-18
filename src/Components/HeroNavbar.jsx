"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  DropdownLabel,
  DropdownPopover,
  Avatar,
} from "@heroui/react";

import {
  ArrowRightFromSquare,
  Gear,
  Persons,
} from "@gravity-ui/icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Tutors", href: "/tutors" },
  { label: "Add Tutor", href: "/addTutor" },
  { label: "My Tutors", href: "/myTutors" },
  { label: "Booked Sessions", href: "/bookedSessions" },
];

export default function HeroNavbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
            H
          </div>

          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Hero
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm transition-all duration-200 ${isActive
                    ? "bg-black text-white font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <Link href={'/Authentication'}>
            <button className="text-gray-500 hover:text-black">
              🔍
            </button></Link>

          {/* Notification */}
          <button className="text-gray-500 hover:text-black">
            🔔
          </button>

          {/* Dropdown */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div>
                <Avatar
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                  className="cursor-pointer"
                />
              </div>
            </DropdownTrigger>

            <DropdownPopover>
              <DropdownMenu aria-label="Profile Actions">

                <DropdownSection showDivider>
                  <DropdownItem key="profile" textValue="Profile">
                    <div className="flex flex-col">
                      <span className="font-semibold">Jane Doe</span>
                      <span className="text-xs text-gray-500">
                        jane@example.com
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownSection>

                <DropdownItem key="dashboard">
                  Dashboard
                </DropdownItem>

                <DropdownItem key="settings">
                  <div className="flex items-center justify-between">
                    <span>Settings</span>
                    <Gear className="size-4" />
                  </div>
                </DropdownItem>

                <DropdownItem key="team">
                  <div className="flex items-center justify-between">
                    <span>Create Team</span>
                    <Persons className="size-4" />
                  </div>
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  className="text-red-500"
                  color="danger"
                >
                  <div className="flex items-center justify-between">
                    <span>Logout</span>
                    <ArrowRightFromSquare className="size-4" />
                  </div>
                </DropdownItem>

              </DropdownMenu>
            </DropdownPopover>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}