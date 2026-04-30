export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isVeg: boolean;
};

export const categories = [
  "All",
  "Starters",
  "Main Course",
  "Rice",
  "Breads",
  "Desserts",
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Paneer Tikka Masala",
    category: "Main Course",
    price: 260,
    image: "/images/paneer-tikka.png",
    description: "Rich creamy paneer curry with authentic Indian spices.",
    isVeg: true,
  },
  {
    id: 2,
    name: "Veg Biryani",
    category: "Rice",
    price: 220,
    image: "/images/veg-biryani.png",
    description: "Aromatic basmati rice cooked with vegetables and saffron.",
    isVeg: true,
  },
  {
    id: 3,
    name: "Butter Naan",
    category: "Breads",
    price: 50,
    image: "/images/butter-naan.png",
    description: "Soft tandoori naan brushed with melted butter.",
    isVeg: true,
  },
  {
    id: 4,
    name: "Dal Makhani",
    category: "Main Course",
    price: 200,
    image: "/images/dal-makhani.png",
    description:
      "Slow-cooked black lentils simmered in cream and butter overnight.",
    isVeg: true,
  },
  {
    id: 5,
    name: "Samosa",
    category: "Starters",
    price: 40,
    image: "/images/samosa.png",
    description:
      "Crispy pastry filled with spiced potatoes, served with green chutney.",
    isVeg: true,
  },
  {
    id: 6,
    name: "Chole Bhature",
    category: "Main Course",
    price: 180,
    image: "/images/chole-bhature.png",
    description: "Fluffy deep-fried bread with spiced chickpea curry.",
    isVeg: true,
  },
  {
    id: 7,
    name: "Palak Paneer",
    category: "Main Course",
    price: 240,
    image: "/images/paneer-tikka.png",
    description: "Creamy spinach curry loaded with soft paneer cubes.",
    isVeg: true,
  },
  {
    id: 8,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 80,
    image: "/images/dal-makhani.png",
    description:
      "Golden fried milk dumplings soaked in rose-scented sugar syrup.",
    isVeg: true,
  },
];