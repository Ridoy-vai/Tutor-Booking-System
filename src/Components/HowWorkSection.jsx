import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Find a Tutor",
    desc: "Easily search for your preferred tutor based on subject, schedule, and location.",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    number: "02",
    icon: "📅",
    title: "Book a Session",
    desc: "Choose your favorite tutor and book a session at your convenient time.",
    color: "#0891B2",
    bg: "#CFFAFE",
  },
  {
    number: "03",
    icon: "🎓",
    title: "Start Learning",
    desc: "Receive your digital token and enjoy your online classes smoothly.",
    color: "#059669",
    bg: "#D1FAE5",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            How It Works
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get Started in Just 3 Steps
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Booking a tutor on MediQueue is extremely simple. Just follow the
            steps below.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-purple-200 via-cyan-200 to-green-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-5 shadow-md transition-transform duration-300 group-hover:-translate-y-2"
                  style={{
                    background: step.bg,
                    border: `2px solid ${step.color}22`,
                  }}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <span
                  className="text-xs font-bold mb-2 tracking-widest"
                  style={{ color: step.color }}
                >
                  STEP {step.number}
                </span>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            href="/tutors"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-purple-200"
          >
            Find a Tutor Now →
          </Link>
        </div>
      </div>
    </section>
  );
}