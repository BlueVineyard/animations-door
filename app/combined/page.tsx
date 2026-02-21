import { Metadata } from "next"
import CombinedExperience from "@/components/combined-experience"

export const metadata: Metadata = {
  title: "Combined - Services & Approach",
  description: "Experience our services and approach in one seamless journey",
}

export default function CombinedPage() {
  return <CombinedExperience />
}
