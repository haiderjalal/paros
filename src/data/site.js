import { IMG } from './images';

export const site = {
  name: 'Paros',
  phone: '0371 9 500 500',
  phoneHref: 'tel:+923719500500',
  address: 'University Road, Chakdara',
};

// Dishes shown in the hero ring carousel.
export const heroSlides = [
  {
    id: 'stuff',
    name: 'Stuff Pizza',
    blurb: 'A stuffed-crust pizza, baked fresh the moment you order it.',
    price: 'Rs 1,499 medium',
    photo: IMG.pizza,
  },
  {
    id: 'beef',
    name: 'Prime Beef',
    blurb: 'Our signature beef burger, stacked and served hot.',
    price: 'Rs 999',
    photo: IMG.burgerStack,
  },
  {
    id: 'chicken',
    name: 'Fried Chicken',
    blurb: 'Golden and crispy, fried to order, one piece or a full plate.',
    price: 'From Rs 250',
    photo: IMG.chicken,
  },
  {
    id: 'alfredo',
    name: 'Fettuccine Alfredo',
    blurb: 'Creamy and rich, tossed fresh for every plate.',
    price: 'Rs 999',
    photo: IMG.pasta,
  },
  {
    id: 'wrap',
    name: 'Crunchy Wrap',
    blurb: 'Crunchy filling, rolled up and ready to eat.',
    price: 'Rs 449',
    photo: IMG.wrap,
  },
];

// The Paros story, told in three scroll-linked chapters.
export const storyChapters = [
  {
    id: 'oven',
    title: 'It starts at the oven.',
    body: 'Nothing at Paros waits under a lamp. Your order goes on, the dough is stretched, and the heat does the rest.',
    photo: IMG.kitchen,
    alt: 'Kitchen at work',
  },
  {
    id: 'crisp',
    title: 'Crisp outside, juicy inside.',
    body: 'From crunchy wings to golden fried chicken, the goal never changes: a crackling outside and a juicy middle worth the wait.',
    photo: IMG.grill,
    alt: 'Meat cooking over open heat',
  },
  {
    id: 'street',
    title: 'Shared on University Road.',
    body: 'Paros cooks for the neighbourhood, from quick lunches to long family dinners. Eat in, or call us for home delivery.',
    photo: IMG.table,
    alt: 'Plates of food shared at a table',
  },
];

export const brandValues = [
  {
    title: 'Made to order.',
    body: 'Every plate is cooked after you order, so it reaches you hot and fresh.',
  },
  {
    title: 'Bold on every plate.',
    body: 'From peri peri to BBQ and honey, the flavours are big and made to be shared.',
  },
  {
    title: 'Shared with Chakdara.',
    body: 'Eat in on University Road, or dial for home delivery.',
  },
];

export const marqueeWords = [
  'Stuff pizza',
  'Prime beef',
  'Crunchy wings',
  'Peri peri wrap',
  'Fettuccine alfredo',
  'Fried chicken',
  'Loaded fries',
  'Cheese lava',
  'Cold coffee',
];
