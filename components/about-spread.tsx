"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { aboutPageData } from "@/lib/data/about"

// Spread positions: cascading diagonal, left-high to right-low
// x/y in px relative to the cluster center
const SPREAD_POSITIONS = [
  { x: -180, y: -80, rotate: -4 },  // left image, high
  { x: 0, y: 0, rotate: 1 },        // center image, middle
  { x: 170, y: 70, rotate: 3 },     // right image, low
]

// Clustered starting positions (tightly stacked)
const CLUSTER_POSITIONS = [
  { x: -12, y: 6, rotate: -2 },
  { x: 0, y: 0, rotate: 1 },
  { x: 10, y: -4, rotate: 3 },
]

export function AboutSpread() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollTop = el.scrollTop
      const sectionHeight = sectionRef.current
        ? sectionRef.current.offsetHeight - el.clientHeight
        : el.scrollHeight - el.clientHeight
      if (sectionHeight <= 0) return
      const progress = Math.min(Math.max(scrollTop / sectionHeight, 0), 1)
      setScrollProgress(progress)
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const getImageStyle = (index: number) => {
    const eased = easeOutCubic(scrollProgress)
    const cluster = CLUSTER_POSITIONS[index]
    const spread = SPREAD_POSITIONS[index]

    const x = cluster.x + (spread.x - cluster.x) * eased
    const y = cluster.y + (spread.y - cluster.y) * eased
    const rotate = cluster.rotate + (spread.rotate - cluster.rotate) * eased

    // z-index: center image on top, then right, then left
    const zOrder = [1, 3, 2]

    return {
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      transition: "transform 0.1s ease-out",
      zIndex: zOrder[index],
    }
  }

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto bg-neutral-950">
      <div ref={sectionRef} className="min-h-[250vh]">
        {/* Sticky section */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex items-center px-6 md:px-12 lg:px-20">
            <div className="flex items-center w-full max-w-7xl mx-auto">
              {/* Left: Title */}
              <div className="shrink-0 w-[30%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.92] tracking-tight">
                  {aboutPageData.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Center: Image cluster that spreads on scroll */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative" style={{ width: 400, height: 340 }}>
                  {aboutPageData.images.map((img, i) => (
                    <div
                      key={i}
                      className="absolute rounded-md overflow-hidden shadow-2xl shadow-black/70"
                      style={{
                        width: 160,
                        height: 210,
                        left: "50%",
                        top: "50%",
                        marginLeft: -80,
                        marginTop: -105,
                        ...getImageStyle(i),
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Description + CTA */}
              <div
                className="shrink-0 w-[22%] flex flex-col gap-8"
                style={{
                  opacity: 0.3 + scrollProgress * 0.7,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                  {aboutPageData.description}
                </p>
                <button className="flex items-center gap-2 px-5 py-2.5 border border-neutral-600 rounded-full text-neutral-300 text-[10px] md:text-xs tracking-widest hover:bg-neutral-800 hover:text-white transition-colors w-fit self-end">
                  {aboutPageData.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v8m-4-4h8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
