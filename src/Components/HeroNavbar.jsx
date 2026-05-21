"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";

import {
  Menu,
  X,
  Home,
  BookOpen,
  Layers3,
  Users,
  PlusCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function HeroNavbar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const logedin = !!user;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },

    {
      label: "Features",
      href: "/features",
      icon: Layers3,
    },

    {
      label: "Tutors",
      href: "/tutors",
      icon: Users,
    },

    ...(logedin
      ? [
          {
            label: "Add Tutor",
            href: "/addTutor",
            icon: PlusCircle,
          },

          {
            label: "My Tutors",
            href: "/myTutors",
            icon: BookOpen,
          },

          {
            label: "Booked Sessions",
            href: "/bookedSessions",
            icon: LayoutDashboard,
          },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      callbackURL: "/",
    });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-10">

              {/* LOGO */}
              <Link href="/" className="flex items-center">
                <img
                  src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                  alt="logo"
                  className="w-20 h-20 object-contain"
                />
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden lg:flex items-center gap-2">

                {navLinks.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-black text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* AUTH */}
              {!logedin ? (
                <div className="hidden sm:flex items-center gap-3">

                  <Link
                    href="/authentication/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/authentication/signup"
                    className="px-5 py-2 rounded-xl bg-black text-white text-sm font-semibold hover:scale-[1.03] active:scale-95 transition"
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
                        `https://ui-avatars.com/api/?name=${
                          user?.name || "User"
                        }`
                      }
                      className="cursor-pointer ring-2 ring-gray-200 w-10 h-10"
                    />
                  </DropdownTrigger>

                  <DropdownPopover>
                    <DropdownMenu aria-label="Profile Menu">

                      <DropdownSection showDivider>
                        <DropdownItem key="profile" isReadOnly>
                          <div className="flex flex-col">
                            <p className="font-semibold">
                              {user?.name}
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

                      <DropdownItem
                        key="logout"
                        className="text-red-500"
                        color="danger"
                        onClick={handleSignOut}
                        startContent={<LogOut size={16} />}
                      >
                        Logout
                      </DropdownItem>

                    </DropdownMenu>
                  </DropdownPopover>
                </Dropdown>
              )}

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm active:scale-95 transition"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-all duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-all duration-500 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* TOP */}
        <div className="flex items-center justify-between px-5 h-16 border-b">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <img
              src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
              alt="logo"
              className="w-16 h-16 object-contain"
            />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* USER */}
        {logedin && (
          <div className="px-5 py-5 border-b">

            <div className="flex items-center gap-3">

              <Avatar
                src={
                  user?.image ||
                  `https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }`
                }
                className="w-12 h-12"
              />

              <div>
                <h3 className="font-semibold text-gray-900">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MENU */}
        <div className="p-4 flex flex-col gap-2">

          {navLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  active
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon
                  size={20}
                  className={`${
                    active
                      ? "text-white"
                      : "text-gray-500 group-hover:text-black"
                  }`}
                />

                <span className="font-medium">
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* MOBILE AUTH */}
          {!logedin ? (
            <div className="mt-4 flex flex-col gap-3">

              <Link
                href="/authentication/login"
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-2xl border text-center font-semibold hover:bg-gray-50 transition"
              >
                Login
              </Link>

              <Link
                href="/authentication/signup"
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-2xl bg-black text-white text-center font-semibold hover:opacity-90 transition"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleSignOut}
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-50 text-red-500 font-semibold hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}