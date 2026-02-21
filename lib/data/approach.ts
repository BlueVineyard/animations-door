export interface TimelineStep {
  title: string
  boldPart: string
  description: string
  image: string
}

export const approachSteps: TimelineStep[] = [
  {
    title: "DISCOVER",
    boldPart: "WE DIVE DEEP INTO YOUR BRAND AND AUDIENCE, UNCOVER THE STORY WORTH ",
    description: "TELLING AND HELP YOU SHAPE YOUR VISION",
    image: "/images/approach-discover.jpg",
  },
  {
    title: "CREATE",
    boldPart: "FROM SCRIPTING AND PROJECT MANAGING LOGISTICS, THROUGH TO CREATIVE ",
    description: "ON-SET PRODUCTION, WE SHAPE COMPELLING VISUALS THAT EMOTIONALLY RESONATE.",
    image: "/images/approach-create.jpg",
  },
  {
    title: "REFINE",
    boldPart: "OUR POLISHED EDITING ELEVATES EVERY FRAME ",
    description: "AND ALIGNS WITH YOUR MESSAGE AND GOALS.",
    image: "/images/approach-refine.jpg",
  },
  {
    title: "DELIVER",
    boldPart: "HIGH-QUALITY ASSETS DELIVERED WITH PRECISION, READY TO MAKE AN ",
    description: "IMPACT ACROSS ANY PLATFORM.",
    image: "/images/approach-deliver.jpg",
  },
]

export const approachPageData = {
  title: "OUR APPROACH",
  subtitle: "A comprehensive process designed to bring your vision to life",
  steps: approachSteps,
}
