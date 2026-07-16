export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  image: string;
  description?: string;
  items?: string[];
  tags?:string[];
  isVeg: boolean;
};


export const menuItems: MenuItem[] = [
  {
  id: 1,
  name: "Masala Papad",
  category: "Pantry",
  price: 40,
  image: "/images/masala-papad.png",
  description: "Crispy papad with masala seasoning.",
  tags: ["papad", "starter", "snack", "veg"],
  isVeg: true
},

{
  id: 2,
  name: "Fry Papad",
  category: "Pantry",
  price: 25,
  image: "/images/fry-papad.png",
  description: "Light and crispy fried papad.",
  tags: ["papad", "starter", "snack", "veg"],
  isVeg: true
},

{
  id: 3,
  name: "Roasted Papad",
  category: "Pantry",
  price: 20,
  image: "/images/roasted-papad.png",
  description: "Gently roasted papad.",
  tags: ["papad", "starter", "healthy", "veg"],
  isVeg: true
},

{
  id: 4,
  name: "Chole Bature",
  category: "Pantry",
  price: 130,
  image: "/images/chole-bhature.png",
  description: "Fluffy deep-fried bread with spiced chickpea curry.",
  tags: ["street food", "punjabi", "north indian", "bread", "main course"],
  isVeg: true
},

{
  id: 5,
  name: "Pav Bhaji",
  category: "Pantry",
  price: 150,
  image: "/images/pav-bhaji.png",
  description: "Mumbai-style spiced mashed vegetables with butter pav.",
  tags: ["street food", "butter", "main course", "veg"],
  isVeg: true
},

{
  id: 6,
  name: "Aalo Paratha",
  category: "Pantry",
  price: 150,
  image: "/images/aalo-paratha.png",
  description: "Potato-stuffed Indian bread, 2 pieces.",
  tags: ["paratha", "bread", "north indian", "main course"],
  isVeg: true
},

{
  id: 7,
  name: "Butter Milk",
  category: "Pantry",
  price: 30,
  image: "/images/butter-milk.png",
  description: "Fresh chilled buttermilk.",
  tags: ["drink", "buttermilk", "beverage", "dairy", "healthy"],
  isVeg: true
},

{
  id: 8,
  name: "Boondi Raita",
  category: "Pantry",
  price: 70,
  image: "/images/boondi-raita.png",
  description: "Yogurt with boondi (tiny fried gram flour balls).",
  tags: ["raita", "yogurt", "dairy", "side dish"],
  isVeg: true
},

{
  id: 9,
  name: "Veg Raita",
  category: "Pantry",
  price: 70,
  image: "/images/veg-raita.png",
  description: "Yogurt with mixed vegetables.",
  tags: ["raita", "yogurt", "veg", "healthy", "dairy"],
  isVeg: true
},

{
  id: 10,
  name: "Green Salad",
  category: "Pantry",
  price: 90,
  image: "/images/green-salad.png",
  description: "Fresh seasonal green salad.",
  tags: ["salad", "healthy", "veg"],
  isVeg: true
},

{
  id: 11,
  name: "Finger Chips",
  category: "Pantry",
  price: 100,
  image: "/images/finger-chips.png",
  description: "Crispy golden potato fries.",
  tags: ["snack", "starter", "veg"],
  isVeg: true
},

{
  id: 12,
  name: "Plain Lassi",
  category: "Pantry",
  price: 50,
  image: "/images/plain-lassi.png",
  description: "Traditional yogurt drink.",
  tags: ["lassi", "drink", "beverage", "dairy", "yogurt"],
  isVeg: true
},

{
  id: 13,
  name: "Patiala Lassi",
  category: "Pantry",
  price: 100,
  image: "/images/patiala-lassi.png",
  description: "Rich and creamy Patiala-style lassi.",
  tags: ["lassi", "drink", "dairy", "creamy", "yogurt"],
  isVeg: true
},

{
  id: 14,
  name: "Mango Lassi",
  category: "Pantry",
  price: 70,
  image: "/images/mango-lassi.png",
  description: "Creamy yogurt drink with ripe mango.",
  tags: ["lassi", "drink", "mango", "fruit", "dairy"],
  isVeg: true
},

{
  id: 15,
  name: "Strawberry Lassi",
  category: "Pantry",
  price: 70,
  image: "/images/strawberry-lassi.png",
  description: "Refreshing strawberry yogurt drink.",
  tags: ["lassi", "drink", "strawberry", "fruit", "dairy"],
  isVeg: true
},

{
  id: 16,
  name: "Dry Fruit Lassi",
  category: "Pantry",
  price: 90,
  image: "/images/dry-fruit-lassi.png",
  description: "Lassi enriched with dry fruits and nuts.",
  tags: ["lassi", "drink", "dry fruits", "nuts", "dairy"],
  isVeg: true
},

{
  id: 17,
  name: "Oreo Shake",
  category: "Pantry",
  price: 100,
  image: "/images/oreo-shake.png",
  description: "Creamy shake with crushed Oreo cookies.",
  tags: ["shake", "drink", "oreo", "milkshake", "dairy"],
  isVeg: true
},

{
  id: 18,
  name: "Chocolate Shake",
  category: "Pantry",
  price: 100,
  image: "/images/chocolate-shake.png",
  description: "Rich and indulgent chocolate milkshake.",
  tags: ["shake", "drink", "chocolate", "milkshake", "dairy"],
  isVeg: true
},

{
  id: 19,
  name: "Cold Coffee",
  category: "Pantry",
  price: 80,
  image: "/images/cold-coffee.png",
  description: "Chilled coffee with milk and ice.",
  tags: ["coffee", "drink", "cold", "dairy"],
  isVeg: true
},

{
  id: 20,
  name: "Tea",
  category: "Pantry",
  price: 30,
  image: "/images/tea.png",
  description: "Hot Indian tea.",
  tags: ["tea", "drink", "hot beverage"],
  isVeg: true
},

{
  id: 21,
  name: "Hot Coffee",
  category: "Pantry",
  price: 50,
  image: "/images/hot-coffee.png",
  description: "Freshly brewed hot coffee.",
  tags: ["coffee", "drink", "hot beverage"],
  isVeg: true
},

{
  id: 22,
  name: "Hot Milk",
  category: "Pantry",
  price: 60,
  image: "/images/hot-milk.png",
  description: "Hot steamed milk.",
  tags: ["drink", "milk", "dairy"],
  isVeg: true
},

{
  id: 23,
  name: "Mint Mojito",
  category: "Pantry",
  price: 150,
  image: "/images/mint-mojito.png",
  description: "Refreshing mint mojito with lime and soda.",
  tags: ["mocktail", "drink", "mint", "lime"],
  isVeg: true
},

{
  id: 24,
  name: "Fresh Lime Soda",
  category: "Pantry",
  price: 50,
  image: "/images/fresh-lime-soda.png",
  description: "Tangy fresh lime soda.",
  tags: ["drink", "soda", "lime", "refreshing"],
  isVeg: true
},

{
  id: 25,
  name: "Dahi",
  category: "Pantry",
  price: 50,
  image: "/images/dahi.png",
  description: "Fresh homemade yogurt.",
  tags: ["yogurt", "dairy", "healthy"],
  isVeg: true
},

{
  id: 26,
  name: "Chapati",
  category: "Tandoori Roti",
  price: 15,
  image: "/images/chapati.png",
  description: "Freshly made whole wheat chapati.",
  tags: ["chapati", "roti", "bread"],
  isVeg: true
},

{
  id: 27,
  name: "Butter Chapati",
  category: "Tandoori Roti",
  price: 20,
  image: "/images/butter-chapati.png",
  description: "Chapati brushed with butter.",
  tags: ["chapati", "roti", "bread", "butter"],
  isVeg: true
},

{
  id: 28,
  name: "Roti",
  category: "Tandoori Roti",
  price: 20,
  image: "/images/rotiii.png",
  description: "Soft tandoori roti.",
  tags: ["roti", "bread"],
  isVeg: true
},

{
  id: 29,
  name: "Butter Roti",
  category: "Tandoori Roti",
  price: 30,
  image: "/images/butter-rotiii.png",
  description: "Roti with butter.",
  tags: ["roti", "bread", "butter"],
  isVeg: true
},

{
  id: 30,
  name: "Kulcha",
  category: "Tandoori Roti",
  price: 30,
  image: "/images/kulcha.png",
  description: "Stuffed or plain kulcha.",
  tags: ["kulcha", "bread", "north indian"],
  isVeg: true
},
{
  id: 31,
  name: "Butter Kulcha",
  category: "Tandoori Roti",
  price: 40,
  image: "/images/butter-kulcha.png",
  description: "Buttery kulcha.",
  tags: ["kulcha", "bread", "butter", "north indian"],
  isVeg: true
},

{
  id: 32,
  name: "Paratha",
  category: "Tandoori Roti",
  price: 40,
  image: "/images/paratha.png",
  description: "Layered paratha.",
  tags: ["paratha", "bread", "north indian"],
  isVeg: true
},

{
  id: 33,
  name: "Butter Paratha",
  category: "Tandoori Roti",
  price: 50,
  image: "/images/butter-paratha.png",
  description: "Paratha with butter.",
  tags: ["paratha", "bread", "butter", "north indian"],
  isVeg: true
},

{
  id: 34,
  name: "Naan",
  category: "Tandoori Roti",
  price: 40,
  image: "/images/naan.png",
  description: "Soft tandoori naan.",
  tags: ["naan", "bread", "tandoori", "north indian"],
  isVeg: true
},

{
  id: 35,
  name: "Butter Naan",
  category: "Tandoori Roti",
  price: 50,
  image: "/images/butter-naan.png",
  description: "Naan with butter.",
  tags: ["naan", "bread", "butter", "tandoori", "north indian"],
  isVeg: true
},

{
  id: 36,
  name: "Garlic Naan",
  category: "Tandoori Roti",
  price: 70,
  image: "/images/garlic-naan.png",
  description: "Naan topped with garlic.",
  tags: ["naan", "bread", "garlic", "tandoori", "north indian"],
  isVeg: true
},

{
  id: 37,
  name: "Butter Garlic Naan",
  category: "Tandoori Roti",
  price: 90,
  image: "/images/butter-garlic-naan.png",
  description: "Garlic naan with extra butter.",
  tags: ["naan", "bread", "garlic", "butter", "tandoori"],
  isVeg: true
},

{
  id: 38,
  name: "Cheese Naan",
  category: "Tandoori Roti",
  price: 115,
  image: "/images/cheese-naan.png",
  description: "Naan stuffed with cheese.",
  tags: ["naan", "bread", "cheese", "tandoori"],
  isVeg: true
},

{
  id: 39,
  name: "Cheese Garlic Naan",
  category: "Tandoori Roti",
  price: 120,
  image: "/images/cheese-garlic-naan.png",
  description: "Garlic naan stuffed with cheese.",
  tags: ["naan", "bread", "cheese", "garlic", "tandoori"],
  isVeg: true
},

{
  id: 40,
  name: "Missi Roti",
  category: "Tandoori Roti",
  price: 50,
  image: "/images/missi-roti.png",
  description: "Protein-rich missi roti.",
  tags: ["roti", "bread", "healthy", "north indian"],
  isVeg: true
},

{
  id: 41,
  name: "Butter Missi Roti",
  category: "Tandoori Roti",
  price: 60,
  image: "/images/butter-missi-roti.png",
  description: "Missi roti with butter.",
  tags: ["roti", "bread", "butter", "healthy"],
  isVeg: true
},

{
  id: 42,
  name: "Butter Aloo Paratha",
  category: "Tandoori Roti",
  price: 100,
  image: "/images/butter-aloo-paratha.png",
  description: "Potato-stuffed paratha with butter.",
  tags: ["paratha", "bread", "potato", "butter", "north indian"],
  isVeg: true
},

{
  id: 43,
  name: "Paneer Paratha",
  category: "Tandoori Roti",
  price: 120,
  image: "/images/paneer-paratha.png",
  description: "Paneer-stuffed paratha.",
  tags: ["paratha", "paneer", "cheese", "bread", "north indian"],
  isVeg: true
},

{
  id: 44,
  name: "Stuff Paratha",
  category: "Tandoori Roti",
  price: 130,
  image: "/images/stuff-paratha.png",
  description: "Assorted stuffed paratha.",
  tags: ["paratha", "bread", "stuffed", "north indian"],
  isVeg: true
},

{
  id: 45,
  name: "Lacha Paratha",
  category: "Tandoori Roti",
  price: 150,
  image: "/images/lacha-paratha.png",
  description: "Layered lacha paratha.",
  tags: ["paratha", "bread", "layered", "north indian"],
  isVeg: true
},

{
  id: 46,
  name: "Real Spice Basket Roti",
  category: "Tandoori Roti",
  price: 300,
  image: "/images/basket-roti.png",
  description: "Signature basket of rotis.",
  tags: ["roti", "bread", "basket", "tandoori"],
  isVeg: true
},

{
  id: 47,
  name: "Makai Roti",
  category: "Tandoori Roti",
  price: 30,
  image: "/images/makai-roti.png",
  description: "Corn flour roti.",
  tags: ["roti", "bread", "corn", "healthy"],
  isVeg: true
},

{
  id: 48,
  name: "Bajra Roti",
  category: "Tandoori Roti",
  price: 30,
  image: "/images/bajra-roti.png",
  description: "Pearl millet roti.",
  tags: ["roti", "bread", "healthy", "millet"],
  isVeg: true
},

{
  id: 49,
  name: "Manchow Soup",
  category: "Soup",
  price: 120,
  image: "/images/manchow-soup.png",
  description: "Warm and spicy Manchow soup.",
  tags: ["soup", "starter", "chinese", "spicy"],
  isVeg: true
},

{
  id: 50,
  name: "Tomato Soup",
  category: "Soup",
  price: 110,
  image: "/images/tomato-soup.png",
  description: "Classic tomato soup.",
  tags: ["soup", "starter", "healthy"],
  isVeg: true
},

{
  id: 51,
  name: "Hot & Sour Soup",
  category: "Soup",
  price: 130,
  image: "/images/hot-sour-soup.png",
  description: "Tangy hot and sour soup.",
  tags: ["soup", "starter", "chinese", "spicy"],
  isVeg: true
},

{
  id: 52,
  name: "Lemon Coriander Soup",
  category: "Soup",
  price: 130,
  image: "/images/lemon-coriander-soup.png",
  description: "Zesty lemon coriander soup.",
  tags: ["soup", "starter", "healthy"],
  isVeg: true
},

{
  id: 53,
  name: "Chilly Potato",
  category: "Chinese Veg Starter",
  price: 190,
  image: "/images/chilly-potato.png",
  description: "Spicy chilly potatoes.",
  tags: ["chinese", "starter", "potato", "spicy"],
  isVeg: true
},

{
  id: 54,
  name: "Paneer Chilly Dry",
  category: "Chinese Veg Starter",
  price: 210,
  image: "/images/paneer-chilly-dry.png",
  description: "Dry chilly paneer.",
  tags: ["chinese", "starter", "paneer", "cheese", "spicy"],
  isVeg: true
},

{
  id: 55,
  name: "Paneer Chilly Gravy",
  category: "Chinese Veg Starter",
  price: 230,
  image: "/images/paneer-chilly-gravy.png",
  description: "Paneer in schezwan gravy.",
  tags: ["chinese", "starter", "paneer", "cheese", "gravy", "spicy"],
  isVeg: true
},

{
  id: 56,
  name: "Paneer 65",
  category: "Chinese Veg Starter",
  price: 230,
  image: "/images/paneer-65.png",
  description: "Crispy paneer 65.",
  tags: ["chinese", "starter", "paneer", "cheese", "crispy", "spicy"],
  isVeg: true
},

{
  id: 57,
  name: "Paneer Crispy",
  category: "Chinese Veg Starter",
  price: 230,
  image: "/images/paneer-crispy.png",
  description: "Crispy fried paneer.",
  tags: ["chinese", "starter", "paneer", "cheese", "crispy"],
  isVeg: true
},

{
  id: 58,
  name: "Veg Crispy",
  category: "Chinese Veg Starter",
  price: 190,
  image: "/images/veg-crispy.png",
  description: "Mixed veg crispy.",
  tags: ["chinese", "starter", "veg", "crispy"],
  isVeg: true
},

{
  id: 59,
  name: "Veg Manchurian",
  category: "Chinese Veg Starter",
  price: 190,
  image: "/images/veg-manchurian.png",
  description: "Veg manchurian in sauce.",
  tags: ["chinese", "starter", "veg", "manchurian"],
  isVeg: true
},

{
  id: 60,
  name: "Mushroom",
  category: "Chinese Veg Starter",
  price: 230,
  image: "/images/mushroom.png",
  description: "Mushroom starter.",
  tags: ["chinese", "starter", "mushroom"],
  isVeg: true
},
{
  id: 61,
  name: "Mushroom Chilly",
  category: "Chinese Veg Starter",
  price: 230,
  image: "/images/mushroom-chilly.png",
  description: "Mushroom chilly.",
  tags: ["chinese", "starter", "mushroom", "spicy", "veg"],
  isVeg: true
},

{
  id: 62,
  name: "Chinese Sizzler",
  category: "Chinese Veg Starter",
  price: 550,
  image: "/images/chinese-sizzler.png",
  description: "Hot Chinese sizzler platter.",
  tags: ["chinese", "starter", "sizzler", "veg", "spicy"],
  isVeg: true
},

{
  id: 63,
  name: "Fried Rice",
  category: "Chinese Rice & Noodles",
  price: 220,
  image: "/images/fried-rice.png",
  description: "Vegetable fried rice.",
  tags: ["chinese", "rice", "veg", "main course"],
  isVeg: true
},

{
  id: 64,
  name: "Schezwan Rice",
  category: "Chinese Rice & Noodles",
  price: 240,
  image: "/images/schezwan-rice.png",
  description: "Spicy schezwan fried rice.",
  tags: ["chinese", "rice", "schezwan", "spicy", "main course"],
  isVeg: true
},

{
  id: 65,
  name: "Tripple Schezwan Rice",
  category: "Chinese Rice & Noodles",
  price: 280,
  image: "/images/tripple-schezwan-rice.png",
  description: "Extra spicy schezwan rice.",
  tags: ["chinese", "rice", "schezwan", "spicy", "main course"],
  isVeg: true
},

{
  id: 66,
  name: "Manchurian Rice",
  category: "Chinese Rice & Noodles",
  price: 260,
  image: "/images/manchurian-rice.png",
  description: "Manchurian tossed rice.",
  tags: ["chinese", "rice", "manchurian", "main course"],
  isVeg: true
},

{
  id: 67,
  name: "Hakka Noodles",
  category: "Chinese Rice & Noodles",
  price: 220,
  image: "/images/hakka-noodles.png",
  description: "Classic hakka noodles.",
  tags: ["chinese", "noodles", "main course"],
  isVeg: true
},

{
  id: 68,
  name: "Schezwan Noodles",
  category: "Chinese Rice & Noodles",
  price: 230,
  image: "/images/schezwan-noodles.png",
  description: "Schezwan flavored noodles.",
  tags: ["chinese", "noodles", "schezwan", "spicy", "main course"],
  isVeg: true
},

{
  id: 69,
  name: "Tripple Schezwan Noodles",
  category: "Chinese Rice & Noodles",
  price: 280,
  image: "/images/tripple-schezwan-noodles.png",
  description: "Extra spicy schezwan noodles.",
  tags: ["chinese", "noodles", "schezwan", "spicy", "main course"],
  isVeg: true
},

{
  id: 70,
  name: "Gulab Jamun (2 Piece)",
  category: "Dessert",
  price: 50,
  image: "/images/gulab-jamun.png",
  description: "Soft syrupy gulab jamun.",
  tags: ["dessert", "sweet", "indian sweet"],
  isVeg: true
},

{
  id: 71,
  name: "Vanilla Ice Cream",
  category: "Dessert",
  price: 30,
  image: "/images/vanilla-ice-cream.png",
  description: "Classic vanilla scoop.",
  tags: ["dessert", "ice cream", "sweet", "vanilla"],
  isVeg: true
},

{
  id: 72,
  name: "Chocolate Ice Cream",
  category: "Dessert",
  price: 40,
  image: "/images/chocolate-ice-cream.png",
  description: "Rich chocolate ice cream.",
  tags: ["dessert", "ice cream", "sweet", "chocolate"],
  isVeg: true
},

{
  id: 73,
  name: "Fruit Salad",
  category: "Dessert",
  price: 50,
  image: "/images/fruit-salad.png",
  description: "Fresh mixed fruit salad.",
  tags: ["dessert", "fruit", "healthy", "sweet"],
  isVeg: true
},

{
  id: 74,
  name: "Orange Juice",
  category: "Fresh Fruit Juice",
  price: 120,
  image: "/images/orange-juice.png",
  description: "Freshly squeezed orange juice.",
  tags: ["juice", "drink", "fruit", "orange", "healthy"],
  isVeg: true
},

{
  id: 75,
  name: "Pineapple Juice",
  category: "Fresh Fruit Juice",
  price: 120,
  image: "/images/pineapple-juice.png",
  description: "Fresh pineapple juice.",
  tags: ["juice", "drink", "fruit", "pineapple", "healthy"],
  isVeg: true
},

{
  id: 76,
  name: "Mix Fruit Juice Glass",
  category: "Real Packed Juice Glass",
  price: 80,
  image: "/images/mix-fruit-juice.png",
  description: "Packaged mix fruit juice glass.",
  tags: ["juice", "drink", "fruit", "packed juice"],
  isVeg: true
},

{
  id: 77,
  name: "Dragon Juice Glass",
  category: "Real Packed Juice Glass",
  price: 80,
  image: "/images/dragon-juice.png",
  description: "Dragon fruit packed juice.",
  tags: ["juice", "drink", "dragon fruit", "packed juice"],
  isVeg: true
},

{
  id: 78,
  name: "Mango Juice Glass",
  category: "Real Packed Juice Glass",
  price: 80,
  image: "/images/mango-juice.png",
  description: "Packaged mango juice.",
  tags: ["juice", "drink", "mango", "packed juice"],
  isVeg: true
},

{
  id: 79,
  name: "Can Berry Juice Glass",
  category: "Real Packed Juice Glass",
  price: 100,
  image: "/images/can-berry-juice.png",
  description: "Packaged berry juice.",
  tags: ["juice", "drink", "berry", "packed juice"],
  isVeg: true
},

{
  id: 80,
  name: "Dal Fry",
  category: "Real Dal Spice",
  price: 120,
  image: "/images/dal-fry.png",
  description: "Homestyle dal fry.",
  tags: ["dal", "punjabi", "north indian", "main course"],
  isVeg: true
},

{
  id: 81,
  name: "Dal Tadka",
  category: "Real Dal Spice",
  price: 140,
  image: "/images/dal-tadka.png",
  description: "Tempered dal tadka.",
  tags: ["dal", "punjabi", "north indian", "main course", "spicy"],
  isVeg: true
},

{
  id: 82,
  name: "Dal Palak",
  category: "Real Dal Spice",
  price: 160,
  image: "/images/dal-palak.png",
  description: "Dal cooked with spinach.",
  tags: ["dal", "palak", "healthy", "main course"],
  isVeg: true
},

{
  id: 83,
  name: "Dal Makhani",
  category: "Real Dal Spice",
  price: 200,
  image: "/images/dal-makhani.png",
  description: "Creamy dal makhani.",
  tags: ["dal", "punjabi", "creamy", "main course"],
  isVeg: true
},

{
  id: 84,
  name: "Steam Rice",
  category: "Spice Rice and Biryani",
  price: 130,
  image: "/images/steam-rice.png",
  description: "Steamed basmati rice.",
  tags: ["rice", "main course", "plain rice"],
  isVeg: true
},

{
  id: 85,
  name: "Jeera Rice",
  category: "Spice Rice and Biryani",
  price: 150,
  image: "/images/jeera-rice.png",
  description: "Cumin flavored rice.",
  tags: ["rice", "jeera", "main course"],
  isVeg: true
},

{
  id: 86,
  name: "Masala Rice",
  category: "Spice Rice and Biryani",
  price: 150,
  image: "/images/masala-rice.png",
  description: "Spiced vegetable rice.",
  tags: ["rice", "masala", "veg", "main course"],
  isVeg: true
},

{
  id: 87,
  name: "Veg Biryani",
  category: "Spice Rice and Biryani",
  price: 180,
  image: "/images/veg-biryani.png",
  description: "Layered vegetable biryani.",
  tags: ["biryani", "rice", "veg", "main course"],
  isVeg: true
},

{
  id: 88,
  name: "Veg Pulav",
  category: "Spice Rice and Biryani",
  price: 190,
  image: "/images/veg-pulav.png",
  description: "Aromatic veg pulav.",
  tags: ["pulav", "rice", "veg", "main course"],
  isVeg: true
},

{
  id: 89,
  name: "Kashmiri Pulav (Sweet)",
  category: "Spice Rice and Biryani",
  price: 200,
  image: "/images/kashmiri-pulav.png",
  description: "Sweet nutty Kashmiri pulav.",
  tags: ["pulav", "rice", "sweet", "dry fruits", "main course"],
  isVeg: true
},

{
  id: 90,
  name: "Veg Hyderabadi Dum Biryani",
  category: "Spice Rice and Biryani",
  price: 250,
  image: "/images/veg-hydrabadi-briyani.png",
  description: "Hyderabadi style dum biryani.",
  tags: ["biryani", "rice", "hyderabadi", "veg", "main course"],
  isVeg: true
},
{
  id: 91,
  name: "Dum Biryani",
  category: "Spice Rice and Biryani",
  price: 280,
  image: "/images/biryani.png",
  description: "Hearty dum biryani.",
  tags: ["biryani", "rice", "indian", "main course", "veg"],
  isVeg: true,
},
{
  id: 92,
  name: "Matka Biryani",
  category: "Spice Rice and Biryani",
  price: 300,
  image: "/images/matka-veg-biryani.png",
  description: "Claypot matka biryani.",
  tags: ["biryani", "rice", "matka", "indian", "veg", "main course"],
  isVeg: true,
},
{
  id: 93,
  name: "Cheese Pulao",
  category: "Spice Rice and Biryani",
  price: 250,
  image: "/images/cheese-pulao.png",
  description: "Cheesy pulao.",
  tags: ["rice", "pulao", "cheese", "veg", "main course"],
  isVeg: true,
},
{
  id: 94,
  name: "Dal Khichdi",
  category: "Spice Rice and Biryani",
  price: 150,
  image: "/images/dal-khichdi.png",
  description: "Comforting dal khichdi.",
  tags: ["khichdi", "rice", "dal", "comfort food", "veg", "main course"],
  isVeg: true,
},
{
  id: 95,
  name: "Palak Khichdi",
  category: "Spice Rice and Biryani",
  price: 160,
  image: "/images/palak-khichdi.png",
  description: "Spinach khichdi.",
  tags: ["khichdi", "rice", "palak", "spinach", "healthy", "veg"],
  isVeg: true,
},
{
  id: 96,
  name: "Palak Tadka Khichdi",
  category: "Spice Rice and Biryani",
  price: 160,
  image: "/images/palak-tadka-khichdi.png",
  description: "Palak khichdi with tadka.",
  tags: ["khichdi", "rice", "palak", "spinach", "tadka", "veg"],
  isVeg: true,
},
{
  id: 97,
  name: "Paneer Tikka",
  category: "Veg Tandoori Starter",
  price: 240,
  image: "/images/paneer-tikka.png",
  description: "Marinated paneer tikka.",
  tags: ["paneer", "cheese", "tandoori", "starter", "punjabi", "veg", "grilled"],
  isVeg: true,
},
{
  id: 98,
  name: "Paneer Malai Tikka",
  category: "Veg Tandoori Starter",
  price: 260,
  image: "/images/paneer-malai-tikka.png",
  description: "Creamy malai paneer tikka.",
  tags: ["paneer", "cheese", "malai", "tandoori", "starter", "veg", "creamy"],
  isVeg: true,
},
{
  id: 99,
  name: "Paneer Kalimirch Tikka",
  category: "Veg Tandoori Starter",
  price: 260,
  image: "/images/paneer-kalimirch-tikka.png",
  description: "Paneer with black pepper.",
  tags: ["paneer", "cheese", "kalimirch", "black pepper", "tandoori", "starter", "veg"],
  isVeg: true,
},
{
  id: 100,
  name: "Paneer Afghani Tikka",
  category: "Veg Tandoori Starter",
  price: 270,
  image: "/images/paneer-afghani-tikka.png",
  description: "Afghani style paneer tikka.",
  tags: ["paneer", "cheese", "afghani", "tandoori", "starter", "veg"],
  isVeg: true,
},
{
  id: 101,
  name: "Paneer Pahadi Tikka",
  category: "Veg Tandoori Starter",
  price: 270,
  image: "/images/paneer-pahadi-tikka.png",
  description: "Pahadi masala paneer tikka.",
  tags: ["paneer", "cheese", "pahadi", "tandoori", "starter", "veg"],
  isVeg: true,
},
{
  id: 102,
  name: "Paneer Seekh Kabab",
  category: "Veg Tandoori Starter",
  price: 270,
  image: "/images/paneer-seekh-kabab.png",
  description: "Paneer seekh style kabab.",
  tags: ["paneer", "cheese", "seekh", "kabab", "starter", "tandoori", "veg"],
  isVeg: true,
},
{
  id: 103,
  name: "Lahsoni Tikka",
  category: "Veg Tandoori Starter",
  price: 270,
  image: "/images/lahsoni-tikka.png",
  description: "Garlic-flavored tikka.",
  tags: ["garlic", "lahsoni", "tandoori", "starter", "veg"],
  isVeg: true,
},
{
  id: 104,
  name: "Mushroom Tikka",
  category: "Veg Tandoori Starter",
  price: 260,
  image: "/images/mushroom-tikka.png",
  description: "Grilled mushroom tikka.",
  tags: ["mushroom", "tandoori", "starter", "veg", "grilled"],
  isVeg: true,
},
{
  id: 105,
  name: "Corn Tikka",
  category: "Veg Tandoori Starter",
  price: 260,
  image: "/images/corn-tikka.png",
  description: "Corn tikka.",
  tags: ["corn", "tandoori", "starter", "veg"],
  isVeg: true,
},
{
  id: 106,
  name: "Soya Chhap Tikka",
  category: "Veg Tandoori Starter",
  price: 260,
  image: "/images/soya-chhap-tikka.png",
  description: "Soya chhap tikka.",
  tags: ["soya", "chaap", "tandoori", "starter", "veg", "protein"],
  isVeg: true,
},
{
  id: 107,
  name: "Hara Bhara Kabab",
  category: "Veg Tandoori Starter",
  price: 230,
  image: "/images/hara-bhara-kabab.png",
  description: "Spinach and peas kabab.",
  tags: ["kabab", "starter", "veg", "spinach", "healthy"],
  isVeg: true,
},
{
  id: 108,
  name: "Real Spice Veg Plater",
  category: "Veg Tandoori Starter",
  price: 800,
  image: "/images/real-spice-veg-platter.png",
  description: "Assorted veg starter platter.",
  tags: ["platter", "starter", "veg", "tandoori", "assorted", "sharing"],
  isVeg: true,
},
{
  id: 109,
  name: "Paneer Masala",
  category: "Real Spice Paneer Special",
  price: 230,
  image: "/images/paneer-masala.png",
  description: "Homestyle paneer masala.",
  tags: ["paneer", "cheese", "punjabi", "main course", "gravy", "veg"],
  isVeg: true,
},
{
  id: 110,
  name: "Paneer Tikka Masala",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-tikka-masala.png",
  description: "Paneer tikka in rich masala.",
  tags: ["paneer", "cheese", "punjabi", "main course", "gravy", "tikka", "veg"],
  isVeg: true,
},
{
  id: 111,
  name: "Paneer Kadai",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-kadai.png",
  description: "Paneer cooked in kadai gravy.",
  tags: ["paneer", "cheese", "punjabi", "main course", "kadai", "gravy", "veg"],
  isVeg: true,
},
{
  id: 112,
  name: "Paneer Butter Masala",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-butter-masala.png",
  description: "Creamy paneer butter masala.",
  tags: ["paneer", "cheese", "butter", "punjabi", "main course", "gravy", "creamy", "veg"],
  isVeg: true,
},
{
  id: 113,
  name: "Paneer Cheese Butter Masala",
  category: "Real Spice Paneer Special",
  price: 280,
  image: "/images/paneer-cheese-butter-masala.png",
  description: "Cheesy paneer butter masala.",
  tags: ["paneer", "cheese", "butter", "punjabi", "main course", "gravy", "creamy", "veg"],
  isVeg: true,
},
{
  id: 114,
  name: "Paneer Handi",
  category: "Real Spice Paneer Special",
  price: 350,
  image: "/images/paneer-handi.png",
  description: "Slow-cooked paneer handi.",
  tags: ["paneer", "cheese", "handi", "punjabi", "main course", "gravy", "veg"],
  isVeg: true,
},
{
  id: 115,
  name: "Paneer Lasunia",
  category: "Real Spice Paneer Special",
  price: 290,
  image: "/images/paneer-lasunia.png",
  description: "Paneer lasunia special.",
  tags: ["paneer", "cheese", "garlic", "lasunia", "punjabi", "main course", "veg"],
  isVeg: true,
},
{
  id: 116,
  name: "Paneer Chatpata",
  category: "Real Spice Paneer Special",
  price: 240,
  image: "/images/paneer-chatpata.png",
  description: "Tangy chatpata paneer.",
  tags: ["paneer", "cheese", "chatpata", "spicy", "punjabi", "main course", "veg"],
  isVeg: true,
},
{
  id: 117,
  name: "Paneer Toofani",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-toofani.png",
  description: "Spicy toofani paneer.",
  tags: ["paneer", "cheese", "spicy", "toofani", "punjabi", "main course", "veg"],
  isVeg: true,
},
{
  id: 118,
  name: "Paneer Lawabdar",
  category: "Real Spice Paneer Special",
  price: 280,
  image: "/images/paneer-lawabdar.png",
  description: "Rich lawabdar paneer.",
  tags: ["paneer", "cheese", "lawabdar", "punjabi", "main course", "rich", "gravy", "veg"],
  isVeg: true,
},
{
  id: 119,
  name: "Paneer Pasanda",
  category: "Real Spice Paneer Special",
  price: 280,
  image: "/images/paneer-pasanda.png",
  description: "Paneer pasanda.",
  tags: ["paneer", "cheese", "pasanda", "punjabi", "main course", "gravy", "veg"],
  isVeg: true,
},
{
  id: 120,
  name: "Paneer Kolhapuri",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-kolhapuri.png",
  description: "Kolhapuri style paneer.",
  tags: ["paneer", "cheese", "kolhapuri", "spicy", "punjabi", "main course", "veg"],
  isVeg: true,
},
{
  id: 121,
  name: "Paneer Bhurji",
  category: "Real Spice Paneer Special",
  price: 250,
  image: "/images/paneer-bhurji.png",
  description: "Spiced paneer bhurji.",
  tags: ["paneer", "cheese", "bhurji", "punjabi", "main course", "veg"],
  isVeg: true,
},
];


export const categories = [
  "All",
  ...new Set(menuItems.map((item) => item.category)),
];