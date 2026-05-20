const reviews = [
  {
    name: "Rahela Begum",
    role: "SSC Candidate",
    subject: "Mathematics",
    avatar: "R",
    rating: 5,
    text: "I found a great math tutor through MediQueue. The booking was completed in just 2 minutes, and I received my digital token before the class even started!",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    name: "Tanvir Ahmed",
    role: "HSC Candidate",
    subject: "Physics",
    avatar: "T",
    rating: 5,
    text: "The online classes have been extremely helpful. Classes always start on time, and the tutor teaches really well. Truly an excellent platform.",
    color: "#0891B2",
    bg: "#ECFEFF",
  },
  {
    name: "Sumaiya Khatun",
    role: "University Admission Candidate",
    subject: "Chemistry",
    avatar: "S",
    rating: 4,
    text: "I used to struggle with chemistry, but now I feel much more confident. The slot management system is amazing — there’s never any confusion.",
    color: "#059669",
    bg: "#ECFDF5",
  },
];

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-200"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Student Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Are Students Saying?
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Thousands of students have already made their learning journey easier using MediQueue.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
            >
              {/* Quote icon */}
              <div className="text-4xl leading-none" style={{ color: r.color }}>
                "
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                {r.text}
              </p>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} filled={j < r.rating} />
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: r.color }}
                >
                  {r.avatar}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {r.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {r.role} · {r.subject}
                  </p>
                </div>

                {/* Subject badge */}
                <span
                  className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: r.bg, color: r.color }}
                >
                  {r.subject}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "1,200+", label: "Active Students" },
            { value: "350+", label: "Qualified Tutors" },
            { value: "4.8/5", label: "Average Rating" },
            { value: "98%", label: "Satisfied Students" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm"
            >
              <p className="text-2xl font-bold text-purple-600 mb-1">
                {stat.value}
              </p>

              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}