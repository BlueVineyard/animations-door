import type { Metadata } from "next"
import { AboutSpread } from "@/components/about-spread"

export const metadata: Metadata = {
  title: "About | Open Gate",
  description: "Learn about our creative vision and the team behind Open Gate.",
}

export default function AboutPage() {
  return <AboutSpread />
}
