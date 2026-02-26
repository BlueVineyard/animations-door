"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { servicesCards } from "@/lib/data/services"
import { approachSteps } from "@/lib/data/approach"

const CARD_ANIMATION_DURATION = 800
const GOLD = "#C8A24E"

type Section = "services" | "approach"

export default function CombinedExperience() {
  const [currentSection, setCurrentSection] = useState<Section>("services")
  
  // Services state
  const [visibleCards, setVisibleCards] = useState(1)
  const [animProgress, setAnimProgress] = useState(0)
  const [animDirection, setAnimDirection] = useState<"forward" | "backward" | null>(null)
  const [servicesComplete, setServicesComplete] = useState(false)
  
  // Approach state
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const approachScrollRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  const isAnimatingRef = useRef(false)
  const visibleCardsRef = useRef(1)
  const servicesCompleteRef = useRef(false)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    visibleCardsRef.current = visibleCards
  }, [visibleCards])
  
  useEffect(() => {
    servicesCompleteRef.current = servicesComplete
  }, [servicesComplete])

  const animateCard = (direction: "forward" | "backward") => {
    if (isAnimatingRef.current) return

    const current = visibleCardsRef.current
    if (direction === "forward" && current >= servicesCards.length) return
    if (direction === "backward" && current <= 1) return

    isAnimatingRef.current = true
    setAnimDirection(direction)
    const startTime = performance.now()

    if (direction === "backward") {
      const prev = current - 1
      setVisibleCards(prev)
      visibleCardsRef.current = prev
      setAnimProgress(1)
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(elapsed / CARD_ANIMATION_DURATION, 1)
      const eased = 1 - Math.pow(1 - rawProgress, 3)

      if (direction === "forward") {
        setAnimProgress(eased)
      } else {
        setAnimProgress(1 - eased)
      }

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        if (direction === "forward") {
          const next = current + 1
          setVisibleCards(next)
          visibleCardsRef.current = next
          setAnimProgress(0)
          if (next >= servicesCards.length) {
            setServicesComplete(true)
          }
        } else {
          setAnimProgress(0)
          if (servicesCompleteRef.current) {
            setServicesComplete(false)
          }
        }
        setAnimDirection(null)
        isAnimatingRef.current = false
        animFrameRef.current = null
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  // Approach scroll tracking
  useEffect(() => {
    const el = approachScrollRef.current
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
  }, [currentSection])

  // Wheel/touch handling for services section
  useEffect(() => {
    const container = servicesRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (currentSection !== "services") return
      
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const direction = e.deltaY > 0 ? "forward" : "backward"

      if (direction === "forward") {
        if (visibleCardsRef.current < servicesCards.length) {
          e.preventDefault()
          animateCard("forward")
        } else if (servicesCompleteRef.current) {
          // Transition to approach section
          setCurrentSection("approach")
        }
      } else {
        if (servicesCompleteRef.current) {
          e.preventDefault()
          setServicesComplete(false)
          animateCard("backward")
        } else if (visibleCardsRef.current > 1) {
          e.preventDefault()
          animateCard("backward")
        }
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (currentSection !== "services" || isAnimatingRef.current) return

      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) < 30) return

      const direction = diff > 0 ? "forward" : "backward"

      if (direction === "forward") {
        if (visibleCardsRef.current < servicesCards.length) {
          animateCard("forward")
        } else if (servicesCompleteRef.current) {
          setCurrentSection("approach")
        }
      } else {
        if (servicesCompleteRef.current) {
          setServicesComplete(false)
          animateCard("backward")
        } else if (visibleCardsRef.current > 1) {
          animateCard("backward")
        }
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [currentSection])

  // Wheel handling for approach section - allow back to services
  useEffect(() => {
    const el = approachScrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (currentSection !== "approach") return
      
      if (e.deltaY < 0 && el.scrollTop === 0) {
        // Scrolling up at the top of approach - go back to services
        e.preventDefault()
        setCurrentSection("services")
        setServicesComplete(true)
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [currentSection])

  const getCardState = (index: number) => {
    const revealed = visibleCards
    const visibleWhenCovered = 105
    const offScreenY = 700

    const isFullyRevealed = index < revealed
    const isAnimatingCard = index === revealed && animProgress > 0
    const isHidden = index > revealed && !(index === revealed && animProgress > 0)

    if (isHidden && !isAnimatingCard) {
      return { y: offScreenY, widthPercent: 100, visible: false }
    }

    let stackY = index * visibleWhenCovered
    let totalShrink = 0
    
    for (let j = index + 1; j < servicesCards.length; j++) {
      if (j < revealed) {
        totalShrink += 4
      } else if (j === revealed && animProgress > 0) {
        totalShrink += animProgress * 4
      }
    }
    const widthPercent = 100 - totalShrink

    if (isFullyRevealed) {
      return { y: stackY, widthPercent, visible: true }
    }

    if (isAnimatingCard) {
      const y = stackY + (1 - animProgress) * offScreenY
      return { y, widthPercent: 100, visible: true }
    }

    return { y: offScreenY, widthPercent: 100, visible: false }
  }

  const getStepProgress = (index: number) => {
    const stepSize = 1 / approachSteps.length
    const stepStart = index * stepSize
    const stepEnd = (index + 1) * stepSize
    return Math.min(Math.max((scrollProgress - stepStart) / (stepEnd - stepStart), 0), 1)
  }

  const timelineFill = scrollProgress

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[#181818]">
      {/* Services Section */}
      <div
        ref={servicesRef}
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: currentSection === "services" ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="h-screen flex flex-col px-5 md:px-10 lg:px-16 py-6 md:py-10">
          <div className="flex items-start justify-between mb-6 md:mb-10">
            <h1 className="text-white leading-[0.95] tracking-tight">
              <span className="block text-3xl md:text-4xl lg:text-5xl font-light">OUR</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">SERVICES</span>
            </h1>
          </div>

          <div className="relative flex-1">
            {servicesCards.map((service, i) => {
              const state = getCardState(i)
              if (!state.visible) return null
              const horizontalPad = (100 - state.widthPercent) / 2

              return (
                <div
                  key={service.number}
                  className="absolute top-0"
                  style={{
                    left: `${horizontalPad}%`,
                    right: `${horizontalPad}%`,
                    transform: `translateY(${state.y}px)`,
                    zIndex: i + 1,
                  }}
                >
                  <div className="bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200/80 rounded-2xl p-5 md:p-6 flex gap-4 md:gap-6 h-[200px] md:h-[240px] lg:h-[260px] shadow-xl shadow-black/40">
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <h2 className="text-neutral-900 text-xl md:text-2xl lg:text-3xl font-bold tracking-wide leading-tight whitespace-pre-line">
                        {service.title}
                      </h2>
                      <div>
                        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                        <button className="mt-3 flex items-center gap-1.5 px-4 py-2 bg-neutral-900 rounded-full text-white text-[10px] md:text-xs tracking-wider">
                          VIEW DETAIL
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative w-[45%] md:w-[40%] rounded-xl overflow-hidden shrink-0">
                      <Image src={service.image} alt={service.title.replace("\n", " ")} fill className="object-cover" />
                      <div className="absolute top-2 right-3 text-3xl md:text-4xl font-bold text-white/80 drop-shadow-lg">
                        {service.number}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div
        ref={approachRef}
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: currentSection === "approach" ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div ref={approachScrollRef} className="h-screen overflow-y-auto bg-[#181818]">
          <div ref={timelineRef} className="min-h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
              <div className="h-full flex flex-col px-6 md:px-12 lg:px-20 py-2 md:py-3">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight">
                    OUR<br />APPROACH
                  </h1>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                    OG
                  </div>
                </div>

                <div className="flex-1 flex gap-0 min-h-0">
                  <div className="flex flex-col justify-between w-[38%] gap-0.5 py-0.5">
                    {approachSteps.map((step, i) => {
                      const stepProgress = getStepProgress(i)
                      const isActive = stepProgress > 0.1
                      return (
                        <div
                          key={step.title}
                          className="relative rounded-lg overflow-hidden flex-1"
                          style={{ opacity: isActive ? 1 : 0.4, transition: "opacity 0.6s ease" }}
                        >
                          <Image src={step.image || "/placeholder.svg"} alt={`${step.title} phase`} fill className="object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:p-4">
                            <span
                              className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide"
                              style={{ color: isActive ? "#fff" : "#999", transition: "color 0.6s ease" }}
                            >
                              {step.title}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="relative w-10 md:w-14 shrink-0">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-neutral-700" />
                    <div
                      className="absolute top-0 left-1/2 w-px origin-top"
                      style={{
                        backgroundColor: GOLD,
                        height: "100%",
                        transform: `translateX(-50%) scaleY(${timelineFill})`,
                      }}
                    />
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

                  <div className="flex-1 flex flex-col justify-between py-1">
                    {approachSteps.map((step, i) => {
                      const stepProgress = getStepProgress(i)
                      const isActive = stepProgress > 0.1
                      return (
                        <div
                          key={`desc-${step.title}`}
                          className="flex items-center flex-1"
                          style={{ opacity: isActive ? 1 : 0.3, transition: "opacity 0.6s ease" }}
                        >
                          <p className="text-xs md:text-sm lg:text-base leading-relaxed tracking-wide uppercase">
                            <span
                              className="font-bold"
                              style={{ color: isActive ? "#fff" : "#666", transition: "color 0.6s ease" }}
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

                <div className="flex justify-center mt-1.5 md:mt-2">
                  <button className="flex items-center gap-2 px-6 py-3 border border-neutral-600 rounded-full text-neutral-400 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-colors">
                    VIEW ABOUT US
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
