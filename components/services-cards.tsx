"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { servicesCards } from "@/lib/data/services"

const CARD_ANIMATION_DURATION = 800

export function ServicesCards() {
  // visibleCards: how many cards are revealed (1 = only card 1, 4 = all cards)
  const [visibleCards, setVisibleCards] = useState(1)
  // animationProgress: 0-1 for the card currently animating in/out
  const [animProgress, setAnimProgress] = useState(0)
  const [animDirection, setAnimDirection] = useState<"forward" | "backward" | null>(null)
  const [cardsComplete, setCardsComplete] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const visibleCardsRef = useRef(1)
  const cardsCompleteRef = useRef(false)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    visibleCardsRef.current = visibleCards
  }, [visibleCards])
  useEffect(() => {
    cardsCompleteRef.current = cardsComplete
  }, [cardsComplete])

  const animateCard = (direction: "forward" | "backward") => {
    if (isAnimatingRef.current) return

    const current = visibleCardsRef.current
    if (direction === "forward" && current >= servicesCards.length) return
    if (direction === "backward" && current <= 1) return

    isAnimatingRef.current = true
    setAnimDirection(direction)
    const startTime = performance.now()

    if (direction === "backward") {
      // For backward: immediately move visibleCards down by 1 so the
      // departing card becomes the "outgoing" card at index === revealed
      const prev = current - 1
      setVisibleCards(prev)
      visibleCardsRef.current = prev
      setAnimProgress(1) // start fully visible, animate to 0
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(elapsed / CARD_ANIMATION_DURATION, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - rawProgress, 3)

      if (direction === "forward") {
        setAnimProgress(eased)
      } else {
        setAnimProgress(1 - eased)
      }

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        if (direction === "forward") {
          const next = current + 1
          setVisibleCards(next)
          visibleCardsRef.current = next
          setAnimProgress(0)
          if (next >= servicesCards.length) {
            setCardsComplete(true)
          }
        } else {
          setAnimProgress(0)
          if (cardsCompleteRef.current) {
            setCardsComplete(false)
          }
        }
        setAnimDirection(null)
        isAnimatingRef.current = false
        animFrameRef.current = null
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const container = containerRef.current
    const scrollArea = scrollAreaRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const direction = e.deltaY > 0 ? "forward" : "backward"

      if (direction === "forward") {
        if (visibleCardsRef.current < servicesCards.length) {
          e.preventDefault()
          animateCard("forward")
        }
        // else: cards complete, allow natural scroll to next section
      } else {
        // scrolling up
        if (scrollArea && scrollArea.scrollTop > 0) {
          // User has scrolled into the overflow section, let them scroll back up naturally
          return
        }
        if (cardsCompleteRef.current) {
          e.preventDefault()
          setCardsComplete(false)
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
      if (isAnimatingRef.current) return

      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) < 30) return

      const direction = diff > 0 ? "forward" : "backward"

      if (direction === "forward") {
        if (visibleCardsRef.current < servicesCards.length) {
          animateCard("forward")
        }
      } else {
        if (scrollArea && scrollArea.scrollTop > 0) return
        if (cardsCompleteRef.current) {
          setCardsComplete(false)
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
  }, [])

  // Calculate card positions
  const getCardState = (index: number) => {
    const cardCount = servicesCards.length
    const revealed = visibleCards
    const visibleWhenCovered = 105
    const offScreenY = 700

    const isFullyRevealed = index < revealed
    const isAnimatingCard = index === revealed && animProgress > 0
    const isHidden = index > revealed && !(index === revealed && animProgress > 0)

    if (isHidden && !isAnimatingCard) {
      return { y: offScreenY, widthPercent: 100, visible: false }
    }

    // Stack Y: how many cards are stacked above this one
    let stackY = index * visibleWhenCovered

    // Width: shrinks based on how many cards are overlapping this one
    let totalShrink = 0
    for (let j = index + 1; j < cardCount; j++) {
      if (j < revealed) {
        // Fully covered by this card
        totalShrink += 4
      } else if (j === revealed && animProgress > 0) {
        // Partially covered by the animating card
        totalShrink += animProgress * 4
      }
    }
    const widthPercent = 100 - totalShrink

    if (isFullyRevealed) {
      return { y: stackY, widthPercent, visible: true }
    }

    if (isAnimatingCard) {
      // Animate from offscreen to stack position (or reverse)
      // animProgress: 1 = fully in position, 0 = fully off-screen
      const y = stackY + (1 - animProgress) * offScreenY
      return { y, widthPercent: 100, visible: true }
    }

    return { y: offScreenY, widthPercent: 100, visible: false }
  }

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[#181818]">
      <div
        ref={scrollAreaRef}
        className="h-full"
        style={{
          overflowY: cardsComplete ? "auto" : "hidden",
        }}
      >
        {/* Cards section - full screen */}
        <div className="h-screen flex flex-col px-5 md:px-10 lg:px-16 py-6 md:py-10 shrink-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 md:mb-10">
            <h1 className="text-white leading-[0.95] tracking-tight">
              <span className="block text-3xl md:text-4xl lg:text-5xl font-light">
                OUR
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">
                SERVICES
              </span>
            </h1>
          </div>

          {/* Stacking cards area */}
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
                    {/* Left: title, description, button */}
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
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              strokeWidth={1.5}
                            />
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

                    {/* Right: image + number */}
                    <div className="relative w-[45%] md:w-[40%] rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title.replace("\n", " ")}
                        fill
                        className="object-cover"
                      />
                      {/* Number overlay */}
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

        {/* Next section - scrollable after all cards revealed */}
        <div className="min-h-screen bg-[#181818] flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center">
            Another sample section
          </h2>
          <p className="mt-6 text-neutral-400 text-lg md:text-xl max-w-2xl text-center leading-relaxed">
            This section scrolls naturally after all service cards have been
            revealed.
          </p>
        </div>
      </div>
    </div>
  )
}
