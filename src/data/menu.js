import { IMG } from './images';

// Pizza size prices, as printed on the Paros menu.
const CLASSIC_SIZES = [
  { label: 'S', price: 799 },
  { label: 'M', price: 1399 },
  { label: 'L', price: 1799 },
];
const SPECIAL_SIZES = [
  { label: 'M', price: 1499 },
  { label: 'L', price: 2099 },
];

export const menu = [
  {
    id: 'pizza',
    name: 'Pizza',
    tagline: 'Classic favourites and special crusts, baked fresh for every order.',
    image: IMG.pizza,
    groups: [
      {
        title: 'Classic pizzas',
        note: 'Available in small, medium and large.',
        items: [
          { name: 'Calzone Special', options: CLASSIC_SIZES },
          { name: 'Supreme', options: CLASSIC_SIZES },
          { name: 'Fajita', options: CLASSIC_SIZES },
          { name: 'Tikka', options: CLASSIC_SIZES },
        ],
      },
      {
        title: 'Special pizzas',
        note: 'Medium and large, on our special crusts.',
        items: [
          { name: 'Crown Crust', options: SPECIAL_SIZES },
          { name: 'Bihari', options: SPECIAL_SIZES },
          { name: 'Stuff', options: SPECIAL_SIZES },
          { name: 'Thin Crust', options: SPECIAL_SIZES },
        ],
      },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers',
    tagline: 'From a classic patty to prime beef, stacked fresh.',
    image: IMG.burger,
    groups: [
      {
        items: [
          { name: 'Prime Beef', price: 999 },
          { name: 'Cheese Lava', price: 899 },
          { name: 'Fish Burger', price: 799 },
          { name: 'Peri Peri', price: 650 },
          { name: 'Zinger', price: 450 },
          { name: 'Crunch', price: 499 },
          { name: 'Patty', price: 350 },
        ],
      },
    ],
  },
  {
    id: 'wraps',
    name: 'Wraps',
    tagline: 'Rolled fresh with crunchy, peri peri and Mexican fillings.',
    image: IMG.wrap,
    groups: [
      {
        items: [
          { name: 'Crunchy', price: 449 },
          { name: 'Peri Peri', price: 549 },
          { name: 'Mexican', price: 499 },
        ],
      },
    ],
  },
  {
    id: 'wings',
    name: 'Wings',
    tagline: 'Four ways to eat them, from crunchy to oven baked.',
    image: IMG.wings,
    groups: [
      {
        note: 'Priced each.',
        items: [
          { name: 'Crunchy', price: 650 },
          { name: 'Oven Baked', price: 650 },
          { name: 'BBQ', price: 650 },
          { name: 'Honey', price: 650 },
        ],
      },
    ],
  },
  {
    id: 'pasta',
    name: 'Pasta',
    tagline: 'Creamy, rich and made fresh to order.',
    image: IMG.pasta,
    groups: [
      {
        items: [
          { name: 'Fettuccine Alfredo', price: 999 },
          { name: 'Crunchy Chicken', price: 899 },
        ],
      },
    ],
  },
  {
    id: 'fried-chicken',
    name: 'Fried Chicken',
    tagline: 'Golden, crispy and fried to order, by the piece or by the plate.',
    image: IMG.chicken,
    groups: [
      {
        items: [
          {
            name: 'Chicken Pieces',
            options: [
              { label: '1 pc', price: 250 },
              { label: '5 pcs', price: 1100 },
              { label: '9 pcs', price: 1800 },
            ],
          },
          {
            name: 'Nuggets',
            options: [
              { label: '6 pcs', price: 299 },
              { label: '12 pcs', price: 549 },
            ],
          },
          {
            name: 'Arabian Nuggets',
            options: [{ label: '6 pcs', price: 549 }],
          },
          { name: 'Chicken Strips', price: 499 },
        ],
      },
    ],
  },
  {
    id: 'fries',
    name: 'Fries & Dips',
    tagline: 'Plain, masala or loaded, with dips on the side.',
    image: IMG.fries,
    groups: [
      {
        items: [
          { name: 'Fries', price: null },
          { name: 'Masala Fries', price: '499–599' },
          { name: 'Loaded Fries', price: 799 },
          { name: 'Dips', price: 99 },
        ],
      },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    tagline: 'Panini, club and fish and chips, made fresh to order.',
    image: IMG.sandwich,
    groups: [
      {
        items: [
          { name: 'Panini', price: 499 },
          { name: 'Club', price: 399 },
          { name: 'Fish & Chips', price: 999 },
        ],
      },
    ],
  },
  {
    id: 'signatures',
    name: 'Signatures',
    tagline: 'Our signature dishes, picked from across the menu.',
    image: IMG.pizzaTop,
    groups: [
      {
        items: [
          { name: 'Stuff Pizza', price: 1499, note: 'Medium size.' },
          { name: 'Prime Beef', price: 999 },
          { name: 'Alfredo Pasta', price: 999 },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    tagline: 'Cold refreshers and hot drinks to go with your meal.',
    image: IMG.drinks,
    groups: [
      {
        title: 'Cold',
        items: [
          { name: 'Mint Margarita', price: 249 },
          { name: 'Fresh Lime', price: 249 },
          { name: 'Cold Coffee', price: 499 },
          { name: 'Soft Drink', price: 119 },
          { name: 'Water', price: 199 },
          { name: 'Water Small', price: 99 },
        ],
      },
      {
        title: 'Hot',
        items: [
          { name: 'Chai', price: 190 },
          { name: 'Green Tea', price: 99 },
          { name: 'Coffee', price: 349 },
          { name: 'Hot Chocolate', price: 399 },
        ],
      },
    ],
  },
];

export const countItems = (category) =>
  category.groups.reduce((total, group) => total + group.items.length, 0);

export const totalItems = menu.reduce((total, category) => total + countItems(category), 0);
