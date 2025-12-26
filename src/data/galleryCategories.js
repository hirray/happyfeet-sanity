export const galleryCategories = [
  {
    slug: "birthday-parties",
    title: "Birthday Parties",
    image: "/birthday.jpg",
    color: "#ff6b6b",
    eventCategory: "Birthday",
  },
  {
    slug: "fiestas-and-fairs",
    title: "Fiestas & Fairs",
    image: "/fiesta.jpg",
    color: "#ff922b",
    eventCategory: "Fiesta",
  },
  {
    slug: "kitty-parties",
    title: "Kitty Parties",
    image: "/kitty.jpg",
    color: "#845ef7",
    eventCategory: "Kitty Party",
  },
  {
    slug: "sip-and-paint",
    title: "Sip & Paint",
    image: "/sippaint.jpg",
    color: "#ff6b6b",
    eventCategory: "Sip & Paint",
  },
  {
    slug: "cook-party",
    title: "Cook Party",
    image: "/cooking.jpg",
    color: "#f9ca24",
    eventCategory: "Cook Party",
  },
  {
    slug: "baby-shower",
    title: "Baby Shower",
    image: "/babyshower.jpg",
    color: "#e056fd",
    eventCategory: "Baby Shower",
  },
  {
    slug: "cake-painting",
    title: "Cake Painting",
    image: "/cakepainting.jpg",
    color: "#ff6b6b",
    eventCategory: "Cake Painting",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    image: "/corporate.jpg",
    color: "#22b8cf",
    eventCategory: "Corporate",
  },
  {
    slug: "workshops",
    title: "Workshops",
    image: "/workshop.jpg",
    color: "#20c997",
    eventCategory: "Workshop",
  },
];

export const getCategoryBySlug = (slug) => galleryCategories.find((c) => c.slug === slug);
