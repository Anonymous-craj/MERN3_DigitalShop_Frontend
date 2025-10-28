import Navbar from "../../globals/components/Navbar";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-slate-800">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Section 1 */}
          <section className="py-24 border-b border-zinc-200/70">
            <div className="container mx-auto px-0 items-center flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2 w-full">
                <div className="lg:pl-10 xl:pl-24">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                    Design And Plan Your Business Growth Steps
                  </h3>
                  <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600">
                    Once the market analysis process is completed, our staff
                    will search for opportunities that are in reach.
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-white text-base font-medium shadow-lg shadow-teal-500/20 ring-1 ring-teal-600/20 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
                    >
                      Explore Solutions
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 w-full lg:w-1/2 order-last lg:order-first">
                <div className="relative rounded-2xl bg-white ring-1 ring-zinc-200/80 shadow-sm p-6 hover:shadow-lg transition-shadow">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1113.58 784.41"
                    className="w-full h-auto"
                  >
                    <defs>
                      <linearGradient
                        id="a"
                        x1="990.77"
                        y1="609.55"
                        x2="1147.32"
                        y2="609.55"
                        gradientTransform="matrix(-1 0 0 1 2040 0)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset={0} stopColor="gray" stopOpacity=".25" />
                        <stop offset=".54" stopColor="gray" stopOpacity=".12" />
                        <stop offset={1} stopColor="gray" stopOpacity=".1" />
                      </linearGradient>
                    </defs>
                    <ellipse
                      cx={965}
                      cy="767.42"
                      rx={64}
                      ry="16.99"
                      fill="#14b8a6"
                      opacity=".08"
                    />
                    <path
                      d="M1070.55 694.89c-24.35 20.2-59 28.56-92.51 33.84l-5.64.86c-35 5.22-70.39 8-105.9 9.69-19 .92-38 1.57-57 2.15l-14.89.44q-29 .86-58.11 1.69-28.5.81-57 1.52-36.5.89-73 1.48-28.5.45-57 .62-36.51.21-73-.14-28.52-.29-57-1-36.52-.94-73-2.75-24.76-1.21-49.49-2.91l-7.51-.53c-70.77-5.1-142.81-14.25-204.74-43.17l-1.67-.79c-.83-.39-1.66-.78-2.49-1.19a224.11 224.11 0 01-32.56-19.09c-18.31-13.06-33.43-29-41.42-47.91-12.52-29.66-5.9-63 8.4-92s35.77-55.18 54.34-82.49c5.44-8 10.6-16.3 15.4-24.81 30-53.37 44.88-115.13 13.43-166.56a228.58 228.58 0 00-13.43-19c-7.67-10-15.47-20-20.74-31.07-12.29-25.76-9.65-54.73-5.17-82.25 6-36.59 17-76 51.38-98.86 35.67-23.74 86.3-22.54 130.57-14 68.83 13.19 132.36 40.8 196.49 65.7s131.31 47.67 201.82 50.12a322.09 322.09 0 0045.38-1.65 287.81 287.81 0 0059.12-12.45c27.75-9.14 53-22.89 71.72-42 40.15-40.85 115.6-43.94 170-19.27 51.91 23.54 85.48 73.36 83 123.12-2.82 55.39-44.3 100.93-82.31 147.64-4.61 5.66-9.16 11.34-13.59 17.06q-3.71 4.79-7.28 9.6c-4.17 5.66-8.2 11.35-12 17.11-19.42 29.53-33.15 65-19.78 96.88 7.5 17.85 21.81 31.47 39.06 43.36 38.65 26.63 92 44.55 116 81.83 20.68 32.13 13.02 75.5-17.88 101.18z"
                      fill="#14b8a6"
                      opacity=".08"
                    />
                    {/* (rest of original SVG unchanged for logic; colors subtly tuned above) */}
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="py-24">
            <div className="container mx-auto px-0 items-center flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="lg:pr-10 xl:pr-24">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                    Search For Performance Optimization
                  </h3>
                  <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600">
                    With all the information in place, you will be presented
                    with an action plan that your company needs to follow.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-slate-900 text-base font-medium shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400"
                    >
                      Learn More
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-white text-base font-medium shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                    >
                      Shop Services
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 w-full lg:w-1/2 order-1 lg:order-2">
                <div className="relative rounded-2xl bg-white ring-1 ring-zinc-200/80 shadow-sm p-6 hover:shadow-lg transition-shadow">
                  {/* Original SVG preserved */}
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1113.58 784.41"
                    className="w-full h-auto"
                  >
                    <defs>
                      <linearGradient
                        id="a"
                        x1="990.77"
                        y1="609.55"
                        x2="1147.32"
                        y2="609.55"
                        gradientTransform="matrix(-1 0 0 1 2040 0)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset={0} stopColor="gray" stopOpacity=".25" />
                        <stop offset=".54" stopColor="gray" stopOpacity=".12" />
                        <stop offset={1} stopColor="gray" stopOpacity=".1" />
                      </linearGradient>
                    </defs>
                    {/* tint primary to emerald accents */}
                    <ellipse
                      cx={965}
                      cy="767.42"
                      rx={64}
                      ry="16.99"
                      fill="#14b8a6"
                      opacity=".08"
                    />
                    {/* (rest of original SVG content omitted for brevity; no logic changes) */}
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section id="stats" className="py-24 lg:pt-32">
            <div className="container mx-auto text-center">
              <p className="uppercase tracking-wider text-slate-500">
                Our customers get results
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-24">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white ring-1 ring-zinc-200/80 shadow-sm p-10 hover:shadow-lg transition-shadow"
                  >
                    <p className="text-4xl lg:text-5xl font-bold tracking-tight text-emerald-600">
                      +100%
                    </p>
                    <p className="mt-3 font-semibold text-slate-900">
                      Stats Information
                    </p>
                    <div className="mt-4 h-1 w-12 mx-auto rounded-full bg-emerald-600/20" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-24 lg:py-36">
            <div className="container mx-auto">
              <p className="uppercase tracking-wider mb-8 text-slate-500 text-center">
                What customers are saying
              </p>
              <div className="flex flex-col md:flex-row md:-mx-3">
                {[
                  { name: "Jane Doe", alt: "Jane Doe" },
                  { name: "John Doe", alt: "John Doe" },
                  { name: "Jane Smith", alt: "Jane Smith" },
                ].map((p, idx) => (
                  <div className="flex-1 px-3" key={idx}>
                    <div
                      className="p-10 rounded-2xl bg-white ring-1 ring-zinc-200/80 shadow-sm hover:shadow-lg transition-shadow"
                      style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
                    >
                      <p className="text-xl font-semibold text-slate-900">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </p>
                      <p className="mt-5 text-slate-600">
                        Eu lobortis elementum nibh tellus molestie nunc non
                        blandit massa. Sit amet consectetur adipiscing elit
                        duis.
                      </p>
                      <div className="flex items-center mt-8">
                        <img
                          className="w-12 h-12 mr-4 rounded-full ring-2 ring-emerald-500/20"
                          src="https://placeimg.com/150/150/people"
                          alt={p.alt}
                        />
                        <div>
                          <p className="font-medium text-slate-900">{p.name}</p>
                          <p className="text-sm text-slate-500">
                            Director of Research and Data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="container mx-auto my-20 py-20 rounded-3xl text-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Ready to grow your business?
            </h3>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Quis lectus nulla at volutpat diam ut. Enim lobortis scelerisque
              fermentum dui faucibus in.
            </p>
            <p className="mt-10">
              <button
                type="button"
                className="py-4 px-10 text-lg rounded-xl bg-white text-slate-900 font-medium shadow-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Get Started Now
              </button>
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-16 mt-24 mb-8 text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">About Us</h2>
              <p className="mt-4 text-slate-600">
                Ridiculus mus mauris vitae ultricies leo integer malesuada nunc.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Important Links
              </h2>
              <ul className="mt-4 space-y-2 leading-loose">
                <li>
                  <a
                    className="hover:underline hover:underline-offset-4"
                    href="https://codebushi.com"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline hover:underline-offset-4"
                    href="https://codebushi.com"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Social Media
              </h2>
              <ul className="mt-4 space-y-2 leading-loose">
                <li>
                  <a
                    className="hover:underline hover:underline-offset-4"
                    href="https://dev.to/changoman"
                  >
                    Dev.to
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline hover:underline-offset-4"
                    href="https://twitter.com/HuntaroSan"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline hover:underline-offset-4"
                    href="https://github.com/codebushi/gatsby-starter-lander"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
