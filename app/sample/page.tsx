import { HomeAnimation } from "@/components/home-animation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sample Page - Open Gate",
  description: "Sample page with embedded hero animation",
}

export default function SamplePage() {
  return (
    <main>
      {/* Hero animation — event-driven, releases scroll after section 1 */}
      <HomeAnimation />

      {/* Sample sections below */}
      <section className="min-h-screen bg-neutral-950 flex items-center justify-center px-8">
        <div className="max-w-3xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Work</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            We craft visual stories that captivate audiences and elevate brands.
            Each project is a unique collaboration driven by creative ambition
            and meticulous attention to detail.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-neutral-800 flex items-center justify-center"
              >
                <span className="text-neutral-600 text-sm">Project {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="max-w-3xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-6">About Us</h2>
          <p className="text-lg text-black/60 leading-relaxed">
            Open Gate is a creative films studio specializing in branded content,
            commercial production, and documentary storytelling. We believe every
            brand has a story worth telling.
          </p>
          <div className="flex justify-center gap-16 mt-12">
            <div>
              <div className="text-4xl font-bold text-black">50+</div>
              <div className="text-sm text-black/50 mt-1">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black">12</div>
              <div className="text-sm text-black/50 mt-1">Awards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black">8</div>
              <div className="text-sm text-black/50 mt-1">Years</div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-neutral-900 flex items-center justify-center px-8">
        <div className="max-w-3xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Services</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {["Commercial Production", "Brand Films", "Documentary"].map((service) => (
              <div
                key={service}
                className="p-8 rounded-xl border border-white/10 text-left"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{service}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  High-quality production from concept to final delivery,
                  tailored to your vision and goals.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black flex items-center justify-center px-8">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Create Together
          </h2>
          <p className="text-white/50 mb-8">
            Ready to bring your vision to life? Get in touch.
          </p>
          <button className="px-8 py-3 border border-white/40 rounded-full text-white text-sm tracking-widest hover:bg-white/10 transition-colors">
            CONTACT US
          </button>
        </div>
      </section>
    </main>
  )
}
