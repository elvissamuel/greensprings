import Image from "next/image"
import Link from "next/link"
import { HeroLeadForm } from "@/components/hero-lead-form"
import { ContinueApplicationBanner } from "@/components/continue-application-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-400/10 rounded-full blur-3xl" />
      </div>

      {/* Continue Application Banner */}
      <ContinueApplicationBanner />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/GSL-Logo.png"
                alt="Greensprings School"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
              <div className="hidden sm:block">
                <p className="font-bold text-white text-sm">Greensprings School</p>
                <p className="text-gold-400 text-xs">Est. 1985</p>
              </div>
            </div>
            
            <Link
              href="https://greenspringsschool.com"
              className="bg-gold-500 hover:bg-gold-400 text-maroon-900 font-semibold px-5 py-2 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-gold-500/25"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
                <span className="text-forest-300 text-sm font-medium">Scholarships Open for 2026/2027</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Scholarship Exams Now Open for
                <span className="block text-gold-400">2026/2027</span>
              </h1>
              
              <p className="text-lg text-maroon-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Join one of Nigeria&apos;s leading educational institutions where excellence meets character. 
                We nurture tomorrow&apos;s leaders with world-class education.
              </p>

              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-0.5"
                >
                  Start Application
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://greenspringsschool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/5"
                >
                  Learn More
                </a>
              </div> */}

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-gold-400">40+</p>
                  <p className="text-maroon-200 text-sm">Years of Excellence</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold-400">3</p>
                  <p className="text-maroon-200 text-sm">Campus Locations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold-400">5000+</p>
                  <p className="text-maroon-200 text-sm">Alumni Worldwide</p>
                </div>
              </div>
            </div>

            {/* Right Content - Lead Capture Form */}
            <div className="flex-1 flex justify-center">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice/Disclaimer */}
      <section className="relative z-10 py-8 px-4 bg-gradient-to-r from-gold-500/10 via-gold-400/10 to-gold-500/10 border-y border-gold-400/20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gold-200">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-maroon-900 font-semibold text-base leading-relaxed">
                Due to high demand, applications will be processed on a first come, first served basis. Registration will close once we reach full capacity. Your payment confirms your spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">
              What You&apos;ll Need to Apply
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prepare these documents before starting your application to ensure a smooth process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: "Personal Information",
                description: "Child's details including date of birth and nationality"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Birth Certificate",
                description: "Original or certified copy of birth certificate"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Parent/Guardian Details",
                description: "Contact information and identification"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: "Academic Records",
                description: "Previous school reports and transcripts"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-maroon-50 to-white p-6 rounded-2xl border border-maroon-100 hover:shadow-xl hover:shadow-maroon-100/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-maroon-100 text-maroon-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-maroon-700 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-maroon-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Fee Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-forest-900 to-forest-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Application Fee
                </div>
                <h3 className="text-3xl font-bold text-maroon-900 mb-4">
                  ₦50,000
                </h3>
                <p className="text-gray-600 mb-6">
                  A non-refundable application fee is required to process your application. 
                  Payment details will be provided after form submission.
                </p>
                <ul className="space-y-3">
                  {["Bank transfer accepted", "Payment confirmation via email", "Processing within 48 hours"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-forest-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-maroon-800 to-maroon-900 p-8 md:p-12 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white mb-4">Ready to Begin?</h4>
                <p className="text-maroon-200 mb-6">
                  Your application progress is automatically saved, so you can complete it at your own pace.
                </p>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold px-6 py-4 rounded-xl transition-all hover:shadow-lg"
                >
                  Begin Application
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-maroon-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/GSL-Logo.png"
                alt="Greensprings School"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <p className="font-bold text-white text-sm">Greensprings School</p>
                <p className="text-maroon-400 text-xs">Excellence in Education Since 1985</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-maroon-300">
              <a href="https://greenspringsschool.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Main Website
              </a>
              <a href="mailto:admissions@greenspringsschool.com" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          <div className="border-t border-maroon-800 mt-8 pt-8 text-center">
            <p className="text-maroon-400 text-sm">
              © {new Date().getFullYear()} Greensprings School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
