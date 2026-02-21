import { ServicesCards } from "@/components/services-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - Open Gate",
  description: "Corporate videos, creative partnerships, social content, and animation services",
}

export default function ServicesPage() {
  return <ServicesCards />
}
