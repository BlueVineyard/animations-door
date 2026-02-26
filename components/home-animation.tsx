"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { homePageData } from "@/lib/data/home"

const ANIMATION_DURATION = 2200 // ms

export function HomeAnimation() {
  const [activeSection, setActiveSection] = useState<0 | 1>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const isAnimatingRef = useRef(false)
  const progressRef = useRef(0)
  const activeSectionRef = useRef<0 | 1>(0)

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  useEffect(() => {
    progressRef.current = animationProgress
  }, [animationProgress])

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  const animateToSection = (targetSection: 0 | 1) => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    setIsAnimating(true)
    startTimeRef.current = null

    const startProgress = progressRef.current
    const endProgress = targetSection === 1 ? 1 : 0

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1)

      // Easing function (ease-in-out cubic)
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const currentProgress = startProgress + (endProgress - startProgress) * eased
      progressRef.current = currentProgress
      setAnimationProgress(currentProgress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setActiveSection(targetSection)
        isAnimatingRef.current = false
        setIsAnimating(false)
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check if the animation container is aligned with the viewport top
    const isContainerActive = () => {
      const rect = container.getBoundingClientRect()
      return Math.abs(rect.top) < 15
    }

    const handleWheel = (e: WheelEvent) => {
      // During animation, always block scroll to prevent page jumping
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      // Only capture scroll when the container is snapped to viewport top
      if (!isContainerActive()) return

      const direction = e.deltaY > 0 ? 1 : -1

      if (direction > 0 && activeSectionRef.current === 0) {
        // Scroll down on section 0 → animate to section 1
        e.preventDefault()
        animateToSection(1)
      } else if (direction < 0 && activeSectionRef.current === 1) {
        // Scroll up on section 1 → animate back to section 0
        e.preventDefault()
        animateToSection(0)
      }
      // section 1 + scroll down → don't preventDefault → page scrolls naturally
      // section 0 + scroll up → don't preventDefault → no-op at top of page
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return
      if (!isContainerActive()) return

      if (
        (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") &&
        activeSectionRef.current === 0
      ) {
        e.preventDefault()
        animateToSection(1)
      } else if (
        (e.key === "ArrowUp" || e.key === "PageUp") &&
        activeSectionRef.current === 1
      ) {
        e.preventDefault()
        animateToSection(0)
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Only block touch scrolling when the animation should capture input
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }
      if (!isContainerActive()) return

      const touchCurrentY = e.touches[0].clientY
      const diff = touchStartY - touchCurrentY

      // Block if scrolling down on section 0, or scrolling up on section 1
      if (
        (diff > 0 && activeSectionRef.current === 0) ||
        (diff < 0 && activeSectionRef.current === 1)
      ) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return
      if (!isContainerActive()) return

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY

      if (Math.abs(diff) > 30) {
        if (diff > 0 && activeSectionRef.current === 0) {
          animateToSection(1)
        } else if (diff < 0 && activeSectionRef.current === 1) {
          animateToSection(0)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Animation phases:
  // 0-0.4: Shape scales up (zoom effect)
  // 0.4-0.7: Door closes
  // 0.7-1: Fade to black and reveal final state
  const shapeScaleProgress = Math.min(animationProgress / 0.4, 1)
  const doorCloseProgress = Math.max(0, Math.min((animationProgress - 0.4) / 0.3, 1))
  const fadeProgress = Math.max(0, Math.min((animationProgress - 0.7) / 0.3, 1))

  const shapeScale = 1 + shapeScaleProgress * 49

  const bgColor =
    animationProgress < 0.6
      ? `rgb(${255 - animationProgress * 200}, ${255 - animationProgress * 200}, ${255 - animationProgress * 200})`
      : `rgb(${Math.round(255 - (255 - 24) * Math.min(1, (animationProgress - 0.3) / 0.7))}, ${Math.round(255 - (255 - 24) * Math.min(1, (animationProgress - 0.3) / 0.7))}, ${Math.round(255 - (255 - 24) * Math.min(1, (animationProgress - 0.3) / 0.7))})`

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden cursor-default select-none"
      style={{ backgroundColor: bgColor }}
    >
      {/* State 1: White background with OPEN [shape] GATE */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: 1 - fadeProgress,
          pointerEvents: activeSection === 0 && !isAnimating ? "auto" : "none",
        }}
      >
        {/* Main text with shape */}
        <div className="flex items-center justify-center gap-6 md:gap-6 lg:gap-6">
          <span
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black"
            style={{
              opacity: 1 - shapeScaleProgress,
            }}
          >
            OPEN
          </span>

          {/* 3D Door Shape Container */}
          <div
            style={{
              perspective: "150px",
              perspectiveOrigin: "center center",
              zIndex: 10,
              transform: `scale(${shapeScale})`,
            }}
          >
            {animationProgress < 0.4 && (
              <div
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                  width: "120px",
                  height: "92px",
                }}
              >
                {/* Left Door */}
                <div
                  className="absolute left-0 top-0 w-1/2 h-full bg-black"
                  style={{
                    transformOrigin: "left center",
                    transform: `rotateY(${44 - doorCloseProgress * 44}deg)`,
                    backfaceVisibility: "visible",
                  }}
                />

                {/* Right Door */}
                <div
                  className="absolute right-0 top-0 w-1/2 h-full bg-black"
                  style={{
                    transformOrigin: "right center",
                    transform: `rotateY(${-44 + doorCloseProgress * 44}deg)`,
                    backfaceVisibility: "visible",
                  }}
                />
              </div>
            )}
          </div>

          <span
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black"
            style={{
              opacity: 1 - shapeScaleProgress,
            }}
          >
            GATE
          </span>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 flex items-center justify-center"
          style={{ opacity: 1 - animationProgress }}
        >
          <div className="w-6 h-6 border border-black/30 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-black/50 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* State 2: Black background with OPEN GATE title, subtitle row, and large video */}
      <div
        className="absolute inset-0 flex flex-col items-center pt-6 md:pt-10 px-4 md:px-8 lg:px-12"
        style={{
          opacity: fadeProgress,
          pointerEvents: activeSection === 1 && !isAnimating ? "auto" : "none",
        }}
      >
        {/* Text section */}
        <div
          className="relative z-10"
          style={{
            transform: `translateY(${(1 - fadeProgress) * 30}vh)`,
          }}
        >
          <h1 className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold tracking-tight text-white leading-none text-center">
            OPEN GATE
          </h1>

          {/* Subtitle row with Creative - Button - Films */}
          <div className="flex items-center justify-center w-full max-w-5xl mt-2 md:mt-4 mx-auto">
            <span className="text-white/60 text-sm md:text-base lg:text-lg tracking-widest">
              {homePageData.hero.titleHighlight.split(" ")[0]}
            </span>
            <div className="flex-1 h-px bg-white/30 mx-4 md:mx-8" />
            <button className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-white/40 rounded-full text-white text-xs md:text-sm tracking-widest hover:bg-white/10 transition-colors whitespace-nowrap">
              {homePageData.hero.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <div className="flex-1 h-px bg-white/30 mx-4 md:mx-8" />
            <span className="text-white/60 text-sm md:text-base lg:text-lg tracking-widest">
              {homePageData.hero.titleHighlight.split(" ")[1]}
            </span>
          </div>
        </div>

        {/* Large video thumbnail */}
        <div
          className="relative w-full max-w-6xl flex-1 mt-4 md:mt-6 mb-4 rounded-lg overflow-hidden"
          style={{
            transform: `translateY(${(1 - fadeProgress) * -20}vh)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">Video Thumbnail</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors border border-white/20">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute top-8 right-8 z-20 flex flex-col gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300",
            activeSection === 0 && !isAnimating ? "scale-125" : "scale-100"
          )}
          style={{
            backgroundColor: animationProgress < 0.5 ? "#000" : "#fff",
            opacity: activeSection === 0 && !isAnimating ? 1 : 0.3,
          }}
        />
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300",
            activeSection === 1 && !isAnimating ? "scale-125" : "scale-100"
          )}
          style={{
            backgroundColor: animationProgress < 0.5 ? "#000" : "#fff",
            opacity: activeSection === 1 && !isAnimating ? 1 : 0.3,
          }}
        />
      </div>
    </div>
  )
}
