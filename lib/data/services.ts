export interface ServiceCard {
  title: string
  number: string
  image: string
  description: string
  avatarColor: string
  avatarLabel: string
}

export const servicesCards: ServiceCard[] = [
  {
    title: "CORPORATE VIDEOS\nAND BRANDED FILMS",
    number: "01",
    image: "/images/service-corporate.jpg",
    description:
      "We dive deep into your brand, audience, and vision to uncover the story worth telling.",
    avatarColor: "#7C3AED",
    avatarLabel: "A",
  },
  {
    title: "CREATIVE AGENCY\nPARTNERSHIPS",
    number: "02",
    image: "/images/service-agency.jpg",
    description:
      "We dive deep into your brand, audience, and vision to uncover the story worth telling.",
    avatarColor: "#2DD4BF",
    avatarLabel: "B",
  },
  {
    title: "SOCIAL & DIGITAL\nCONTENT",
    number: "03",
    image: "/images/service-social.jpg",
    description:
      "We dive deep into your brand, audience, and vision to uncover the story worth telling.",
    avatarColor: "#FBBF24",
    avatarLabel: "C",
  },
  {
    title: "ANIMATION",
    number: "04",
    image: "/images/service-animation.jpg",
    description:
      "We dive deep into your brand, audience, and vision to uncover the story worth telling.",
    avatarColor: "#34D399",
    avatarLabel: "B",
  },
]

export const servicesPageData = {
  title: "OUR SERVICES",
  subtitle: "Discover what we offer",
  cards: servicesCards,
}
