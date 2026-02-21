"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { approachSteps } from "@/lib/data/approach"

const GOLD = "#C8A24E"

export function ApproachTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollTop = el.scrollTop
      const timelineHeight = timelineRef.current
        ? timelineRef.current.offsetHeight - el.clientHeight
        : el.scrollHeight - el.clientHeight
      if (timelineHeight <= 0) return
      const progress = Math.min(Math.max(scrollTop / timelineHeight, 0), 1)
      setScrollProgress(progress)
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const getStepProgress = (index: number) => {
    const stepSize = 1 / approachSteps.length
    const stepStart = index * stepSize
    const stepEnd = (index + 1) * stepSize
    return Math.min(Math.max((scrollProgress - stepStart) / (stepEnd - stepStart), 0), 1)
  }

  const timelineFill = scrollProgress

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto bg-neutral-950">
      <div ref={timelineRef} className="min-h-[400vh]">
        {/* Sticky container that stays in view */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex flex-col px-6 md:px-12 lg:px-20 py-2 md:py-3">
            {/* Header */}
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight">
                OUR<br />APPROACH
              </h1>
            </div>

            {/* Timeline content: Images | Timeline | Descriptions */}
            <div className="flex-1 flex gap-0 min-h-0">
              {/* Left column: Image cards */}
              <div className="flex flex-col justify-between w-[38%] gap-0.5 py-0.5">
                {approachSteps.map((step, i) => {
                  const stepProgress = getStepProgress(i)
                  const isActive = stepProgress > 0.1
                  return (
                    <div
                      key={step.title}
                      className="relative rounded-lg overflow-hidden flex-1"
                      style={{
                        opacity: isActive ? 1 : 0.4,
                        transition: "opacity 0.6s ease",
                      }}
                    >
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={`${step.title} phase`}
                        fill
                        className="object-cover"
                      />
                      {/* Title overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:p-4">
                        <span
                          className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide"
                          style={{
                            color: isActive ? "#fff" : "#999",
                            transition: "color 0.6s ease",
                          }}
                        >
                          {step.title}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Center: Timeline line + dots */}
              <div className="relative w-10 md:w-14 shrink-0">
                {/* Background line (gray) */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-neutral-700" />
                {/* Gold fill line */}
                <div
                  className="absolute top-0 left-1/2 w-px origin-top"
                  style={{
                    backgroundColor: GOLD,
                    height: "100%",
                    transform: `translateX(-50%) scaleY(${timelineFill})`,
                  }}
                />
                {/* Dots for each step */}
                {approachSteps.map((_, i) => {
                  const stepProgress = getStepProgress(i)
                  const yPos = `${(i / approachSteps.length) * 100 + 100 / approachSteps.length / 2}%`
                  const isActive = stepProgress > 0.1
                  return (
                    <div
                      key={`dot-${i}`}
                      className="absolute left-1/2 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        top: yPos,
                        transform: "translate(-50%, -50%)",
                        borderColor: isActive ? GOLD : "#525252",
                        backgroundColor: isActive ? GOLD : "transparent",
                        transition: "all 0.5s ease",
                      }}
                    />
                  )
                })}
              </div>

              {/* Right column: Descriptions */}
              <div className="flex-1 flex flex-col justify-between py-1">
                {approachSteps.map((step, i) => {
                  const stepProgress = getStepProgress(i)
                  const isActive = stepProgress > 0.1
                  return (
                    <div
                      key={`desc-${step.title}`}
                      className="flex items-center flex-1"
                      style={{
                        opacity: isActive ? 1 : 0.3,
                        transition: "opacity 0.6s ease",
                      }}
                    >
                      <p className="text-xs md:text-sm lg:text-base leading-relaxed tracking-wide uppercase">
                        <span
                          className="font-bold"
                          style={{
                            color: isActive ? "#fff" : "#666",
                            transition: "color 0.6s ease",
                          }}
                        >
                          {step.boldPart}
                        </span>
                        <span
                          style={{
                            color: isActive ? "rgba(255,255,255,0.6)" : "#444",
                            transition: "color 0.6s ease",
                          }}
                        >
                          {step.description}
                        </span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom button */}
            <div className="flex justify-center mt-1.5 md:mt-2">
              <button className="flex items-center gap-2 px-6 py-3 border border-neutral-600 rounded-full text-neutral-400 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-colors">
                VIEW ABOUT US
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

      {/* Another sample section - scrolls normally after timeline */}
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center">
          Another sample section
        </h2>
        <p className="mt-6 text-neutral-400 text-lg md:text-xl max-w-2xl text-center leading-relaxed">
          This section scrolls naturally after the timeline animation completes. Add any content you need here.
        </p>
      </div>
    </div>
  )
}
