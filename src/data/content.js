import {
  FaRobot,
  FaRecycle,
  FaLeaf,
  FaCloudUploadAlt,
} from "react-icons/fa";

export const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#calculator", label: "Calculator" },
  { href: "#experiments", label: "Lab Notes" },
  { href: "#recycling-centers", label: "Recycling Finder" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#footer", label: "Contact" },
];

export const FEATURES = [
  {
    icon: FaRobot,
    title: "AI Detection",
    desc: "Identify plastic types instantly using AI-powered image recognition.",
  },
  {
    icon: FaRecycle,
    title: "Smart Recycling",
    desc: "Learn the correct recycling method for every plastic category.",
  },
  {
    icon: FaLeaf,
    title: "Eco Alternatives",
    desc: "Discover sustainable and biodegradable product alternatives.",
  },
  {
    icon: FaRecycle,
    title: "Recycling Finder",
    desc: "Open a live map search for recycling facilities near you.",
  },
];

export const STEPS = [
  {
    number: "01",
    icon: FaCloudUploadAlt,
    title: "Upload Image",
    desc: "Capture or upload a photo of any plastic product to begin the analysis.",
  },
  {
    number: "02",
    icon: FaRobot,
    title: "AI Analysis",
    desc: "Our AI identifies the plastic type and determines its recyclability instantly.",
  },
  {
    number: "03",
    icon: FaRecycle,
    title: "Get Recycling Guide",
    desc: "Receive proper recycling instructions and locate nearby recycling centers.",
  },
  {
    number: "04",
    icon: FaLeaf,
    title: "Choose Green",
    desc: "Explore eco-friendly alternatives and reduce your plastic footprint.",
  },
];

export const QUICK_PROMPTS = [
  "What is PET plastic?",
  "How do I recycle a bucket?",
  "Alternatives to plastic bags?",
];
