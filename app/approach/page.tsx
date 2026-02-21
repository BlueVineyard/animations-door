import { ApproachTimeline } from "@/components/approach-timeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Approach - Open Gate",
  description: "Discover, Create, Refine, Deliver - Our four-step approach to creative filmmaking",
}

export default function ApproachPage() {
  return <ApproachTimeline />
}
