export interface AboutImage {
  src: string
  alt: string
}

export interface AboutContent {
  title: string[]
  description: string
  cta: string
  images: AboutImage[]
}

export const aboutPageData: AboutContent = {
  title: ["LET'S", "CREATE", "SOMETHING", "GREAT", "TOGETHER"],
  description:
    "Whether you're building a brand, telling a story, or capturing a moment — we're here to bring your vision to life.",
  cta: "VIEW OUR PROJECTS",
  images: [
    { src: "/images/about-1.jpg", alt: "Cinematic boat scene at sunset" },
    { src: "/images/about-2.jpg", alt: "Behind the scenes film production" },
    { src: "/images/about-3.jpg", alt: "Dynamic wakeboarding action shot" },
  ],
}
