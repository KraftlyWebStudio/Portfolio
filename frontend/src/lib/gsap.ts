import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins once — safe for Next.js HMR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger };
