
import { Destination, Review } from './types';

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Tebing Breksi',
    location: 'Sleman, Daerah Istimewa Yogyakarta',
    category: 'Nature',
    rating: 4.8,
    reviews: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCj684sZgpsKfpb5ZUEZpOuvgG9E3wZ4ixvvSrV2iCXMFwPqvLHh6Gcpw24WHd_fzMKGYqS4wT7Ca-c6XJeIc3HCgej7JcCJwTSL2Z-wYgEQpZeopkFueOto1t-slcKmVPvEJ-DZwDj1Yaw93znXZ9rzQHTb5Af0XVkNyCIhxkBQdaNsT9WnFYrvn8jb-693cKjruXBp_zvlMmnE_-az8xLZn-mmzEL53eGx35oI2U6R34wluzAR0uMhYieU7mXW4-WR-ZWZg_aIUB',
    description: 'Breathtaking hand-carved limestone cliffs showcasing Javanese art.',
    price: 'IDR 10.000',
    hours: '06:00 AM - 08:00 PM',
    distanceFromCenter: '45 mins from City Center',
    whyVisit: 'Tebing Breksi offers breathtaking hand-carved limestone cliffs that showcase Javanese art and culture. It\'s the perfect spot for panoramic views of Yogyakarta, especially during the golden hour.',
    proTips: [
      'Visit before sunset for the best photo lighting.',
      'Wear comfortable shoes for climbing the steps.',
      'The site is accessible by ride-hailing apps.'
    ]
  },
  {
    id: '2',
    name: 'Borobudur Temple',
    location: 'Magelang, Central Java',
    category: 'Heritage',
    rating: 4.9,
    reviews: 5800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUW1Uyfh-u5RzmqVBGRHhDoKwFJ-TkQUQ5g9tvKu0idTDWVPEt3mHWg9UGijEHJVH5iuFYhi6p46i0TWeCpJ9hZ8xA9-xuh3BShLEY-6MEUUFp3rW8Ms8l-qFIJ-wsi0yGWOI3wnvZVJD6oH3QFZUlCXdOko7QXbG8p-mZ3pvtMuI9Sj512JC_oKZzMTE-QHD46ErVSUpt8TvydynD4VU7SEcikXTI4dxCkrbqTfrN51Xt4y_lYTXTKeD-lkpSbvL8lViH4MFR7jX',
    description: 'The world\'s largest Buddhist temple at dawn.',
    price: 'IDR 50.000',
    hours: '06:30 AM - 04:30 PM',
    distanceFromCenter: '90 mins from City Center',
    whyVisit: 'An architectural masterpiece and a UNESCO World Heritage site.',
    proTips: ['Book tickets in advance.', 'Hire a guide for deep history.']
  },
  {
    id: '3',
    name: 'Parangtritis Beach',
    location: 'Bantul, Yogyakarta',
    category: 'Nature',
    rating: 4.7,
    reviews: 2100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDId53rQ6_CSlG7vrHPITivB-rMBKHhITH5OWPKtm7-aFexUr35GvmlSpyyFyt-YL_8EoYU79tmZufSDywZ9lVLydddGfOMdpVZUnE1zvDlu3NdViWLryjTdJh57CTZnYPVNUL89T0-MY6pFgNnh1HkOzpuicLpR6BPJaPzomF4DBCRUORGwkHYzTUi6GFXIUP1Ihrd4FpvLSB_kl1cHebS-cWaLo3tMCYQfg8-jsx-BxUHPAgv34UK8oEVkpTQwTEfm5_ktbZk8-Za',
    description: 'Mystical black sand beach with dramatic cliffs.',
    price: 'IDR 5.000',
    hours: '24 Hours',
    distanceFromCenter: '60 mins from City Center',
    whyVisit: 'Famed for its legendary sunset and mystic atmosphere.',
    proTips: ['Try the horse carriage rides.', 'Visit at sunset.']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Andini Dian',
    userAvatar: 'AD',
    date: '2 days ago',
    rating: 5,
    comment: 'Absolutely loved the carvings! It\'s amazing what humans can do with a limestone cliff. The view from the top is breathtaking.',
    helpfulCount: 12
  },
  {
    id: 'r2',
    userName: 'Rizky Pratama',
    userAvatar: 'https://picsum.photos/seed/rizky/40/40',
    date: '1 week ago',
    rating: 4,
    comment: 'A bit crowded on weekends, but still worth the visit. The live music at the amphitheater added a great vibe.',
    helpfulCount: 8
  }
];
