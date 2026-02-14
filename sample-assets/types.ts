
export interface Destination {
  id: string;
  name: string;
  location: string;
  category: 'Heritage' | 'Nature' | 'Shopping' | 'Food';
  rating: number;
  reviews: number;
  image: string;
  description: string;
  price: string;
  hours: string;
  distanceFromCenter: string;
  proTips: string[];
  whyVisit: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  date: string;
  rating: number;
  comment: string;
  helpfulCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  recommendation?: AIRecommendation;
}

export interface AIRecommendation {
  name: string;
  location: string;
  description: string;
  rating: string;
  reviews: string;
  image: string;
  pros: string[];
  cons: string[];
  priceRange: string;
  recommendationFor: string;
  mapLink: string;
}
