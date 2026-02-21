import { HomeAnimation } from "@/components/home-animation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Open Gate - Creative Films",
  description: "Creative films and branded content production",
}

export default function HomePage() {
  return <HomeAnimation />
}
