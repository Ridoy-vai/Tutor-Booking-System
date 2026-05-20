"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
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
    <nav className="w-full border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navbar Content */}
        <div className="flex items-center justify-between h-16">

          <img
            src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
            alt="Logo"
            className="h-20 w-20"
          />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Auth Buttons */}
            {!logedin ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/authentication/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition"
                >
                  Login
                </Link>

                <Link
                  href="/authentication/signup"
                  className="px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=7c3aed&color=fff&size=512`
                    }
                    alt={user?.name || "User"}
                    className="cursor-pointer ring-2 ring-gray-200"
                  />
                </DropdownTrigger>

                <DropdownPopover>
                  <DropdownMenu aria-label="Profile Actions">

                    <DropdownSection showDivider>
                      <DropdownItem key="profile" isReadOnly>
                        <div className="flex flex-col">
                          <p className="font-semibold">
                            {user?.name || "User"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownItem>
                    </DropdownSection>

                    <DropdownItem key="dashboard">
                      Dashboard
                    </DropdownItem>

                    <DropdownItem key="settings">
                      Settings
                    </DropdownItem>

                    <DropdownItem key="team">
                      Create Team
                    </DropdownItem>

                    <DropdownItem
                      key="logout"
                      className="text-red-500"
                      color="danger"
                      onClick={handleSignOut}
                    >
                      Logout
                    </DropdownItem>

                  </DropdownMenu>
                </DropdownPopover>
              </Dropdown>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[500px] pb-5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-3 border-t">

            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Auth */}
            {!logedin && (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href="/authentication/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl border text-center text-sm font-medium hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  href="/authentication/signup"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl bg-black text-white text-center text-sm font-medium"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}