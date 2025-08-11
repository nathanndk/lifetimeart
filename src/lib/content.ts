export type Service = {
  slug: string;
  title: string;
  description: string;
};

export type FAQ = {
  q: string;
  a: string;
};

export const services: Service[] = [
  {
    slug: "kitchens",
    title: "Kitchens",
    description:
      "At LifetimeArt, we design and build stunning kitchens tailored to your style and needs. Whether you prefer sleek modern lines or a timeless, classic look, our team delivers premium craftsmanship, functional layouts, and meticulous attention to detail—creating a kitchen you’ll love to cook and gather in.",
  },
  {
    slug: "loft",
    title: "Loft Conversions",
    description:
      "Transform unused loft space into a beautiful, practical part of your home. From cozy bedrooms to bright home offices, we handle everything from structural adjustments to finishing touches, ensuring your new space is safe, stylish, and seamlessly integrated with your existing home.",
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    description:
      "We create bathrooms that balance relaxation and practicality, with designs ranging from spa-inspired retreats to minimalist, functional spaces. Our team sources high-quality fixtures and finishes, ensuring durability, elegance, and comfort for years to come.",
  },
  {
    slug: "extensions",
    title: "Extensions",
    description:
      "Expand your living space without compromising on style. Whether it’s a kitchen extension, a new family room, or an entire additional floor, we work closely with you to design and build an extension that complements your home and adds value.",
  },
  {
    slug: "restorations",
    title: "Restorations",
    description:
      "Preserve the charm of your property while upgrading it for modern living. Our restoration work combines traditional craftsmanship with modern techniques to breathe new life into historic or worn-down spaces.",
  },
  {
    slug: "external",
    title: "External Works",
    description:
      "Enhance the beauty and functionality of your outdoor areas. From garden landscaping to patios, pathways, and exterior lighting, we create inviting spaces that connect your home to nature.",
  },
];

export const faqs: FAQ[] = [
  {
    q: "What area are you based in?",
    a: "We primarily serve London and the surrounding areas, but depending on the project, we can travel further. Contact us to discuss your location and requirements.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary depending on size and complexity. We’ll provide an estimated schedule during your consultation and keep you updated throughout the process.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes, we offer free, no-obligation quotes. Our team will visit your property, assess your needs, and provide a detailed breakdown.",
  },
  {
    q: "Will I need planning permission for my project?",
    a: "This depends on the type and scope of your project. We can guide you through local regulations and help with applications if needed.",
  },
  {
    q: "Do you provide a guarantee for your work?",
    a: "Absolutely. All of our work is backed by a guarantee for quality and durability, giving you peace of mind.",
  },
  {
    q: "Can I stay in my home while the work is being done?",
    a: "In most cases, yes—though it may depend on the scope of work and areas affected. We’ll discuss options to minimise disruption.",
  },
  {
    q: "How do I get started with a project?",
    a: "Simply get in touch with our team. We’ll arrange a consultation, discuss your ideas, and prepare a tailored plan and quote.",
  },
];
