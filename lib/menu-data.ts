export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  image: string;
  description?: string;
  items?: string[];
  isVeg: boolean;
};

export const categories = [
  "All",
  "Pack Lunch",
  "Other",
  "Beverages",
  "Dessert",
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Veg Thali",
    category: "Pack Lunch",
    price: 160,
    image: "/images/paneer-tikka.png",
    items: [
      "Paneer Sabji",
      "Mix Veg",
      "Dal Fry",
      "Rice",
      "Papad",
      "Salad",
      "Chapati (2 pc)",
    ],
    isVeg: true,
  },
  {
    id: 2,
    name: "Special Pack Lunch",
    category: "Pack Lunch",
    price: 240,
    image: "/images/veg-biryani.png",
    items: [
      "Paneer Toofani",
      "Veg Kadai",
      "Dal Tadka",
      "Jeera Rice",
      "Papad",
      "Salad",
      "Tandoori Roti (2 pc)",
      "Gulab Jamun (1 pc)",
    ],
    isVeg: true,
  },
  {
    id: 3,
    name: "Chinese",
    category: "Other",
    price: null,
    image: "/images/samosa.png",
    description: "Tasty Indo-Chinese dishes made fresh to order.",
    isVeg: true,
  },
  {
    id: 4,
    name: "Pav Bhaji",
    category: "Other",
    price: null,
    image: "/images/chole-bhature.png",
    description: "Mumbai-style spiced mashed vegetables with butter pav.",
    isVeg: true,
  },
  {
    id: 5,
    name: "Sandwich",
    category: "Other",
    price: null,
    image: "/images/butter-naan.png",
    description: "Fresh grilled sandwiches with assorted fillings.",
    isVeg: true,
  },
  {
    id: 6,
    name: "Chole Bhature",
    category: "Other",
    price: null,
    image: "/images/chole-bhature.png",
    description: "Fluffy deep-fried bread with spiced chickpea curry.",
    isVeg: true,
  },
  {
    id: 7,
    name: "Pizza",
    category: "Other",
    price: null,
    image: "/images/dal-makhani.png",
    description: "Freshly baked pizza with your choice of toppings.",
    isVeg: true,
  },
  {
    id: 8,
    name: "Fresh Juice",
    category: "Beverages",
    price: null,
    image: "/images/samosa.png",
    description: "Seasonal fresh fruit juices, made on the spot.",
    isVeg: true,
  },
  {
    id: 9,
    name: "Ice Cream",
    category: "Dessert",
    price: null,
    image: "/images/dal-makhani.png",
    description: "Creamy scoops in a variety of rich flavours.",
    isVeg: true,
  },
  {
    id: 10,
    name: "Shakes",
    category: "Beverages",
    price: null,
    image: "/images/veg-biryani.png",
    description: "Thick, creamy milkshakes in assorted flavours.",
    isVeg: true,
  },
];