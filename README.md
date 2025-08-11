README — Mobile Animation Approach

- Only animate what’s on screen. Elements fade/slide in when they enter the viewport. Short timings (about 200–400ms) with small stagger so it feels smooth, not flashy.

- GPU-friendly props only. We stick to opacity and transform (translate/scale). No layout jumps, no jank.

- Respect “Reduce Motion”. If the user prefers less motion, we turn off parallax and stagger, and show content instantly.

- Simple rules per section.
Nav/logo: quick fade down; links get a soft underline on hover.
Headline: line-by-line lift; paragraph fades in right after.
Button: fades in; on hover it lifts slightly and the arrow nudges right.
Image: subtle fade + scale; testimonial slides in from bottom-right.

- Thumb-friendly carousels. Horizontal tracks use CSS scroll-snap; JS only updates dots/centering. Images use object-cover so they stay crisp across sizes.
