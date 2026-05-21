import Link from "next/link";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Biology",
  "Bangla",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Tutors", href: "/tutors" },
  { label: "Add Tutor", href: "/add-tutor" },
  { label: "My Tutors", href: "/my-tutors" },
  { label: "Booked Sessions", href: "/my-bookings" },
];

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200 text-gray-300 hover:text-white"
  >
    {children}
  </a>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-7xl mx-auto bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="w-full px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>

              <span className="text-white font-bold text-lg tracking-tight">
                MediQueue
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              MediQueue is a modern tutor booking platform where students can
              easily find tutors online and book sessions anytime.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://x.com" label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://youtube.com" label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon fill="#111827" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Subject links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Subjects
            </h4>

            <ul className="space-y-2.5">
              {subjects.map((s) => (
                <li key={s}>
                  <Link
                    href={`/tutors?subject=${s}`}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-150 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 inline-block" />
                    {s} Tutors
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-150 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Dhaka, Bangladesh
              </li>

              <li className="flex items-center gap-3 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@mediqueue.com
              </li>

              <li className="flex items-center gap-3 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +880 1700-000000
              </li>

              <li className="flex items-center gap-3 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Saturday – Thursday, 9:00 AM – 9:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {year} MediQueue. All rights reserved.
          </p>

          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (t) => (
                <Link
                  key={t}
                  href="#"
                  className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {t}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}