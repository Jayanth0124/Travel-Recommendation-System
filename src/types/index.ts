export interface UserProfile {
  id: string;
  name: string;
  age: number;
  demographics: {
    location: string;
    income: string;
    lifestyle: string;
  };
  preferences: {
    climate: string[];
    activities: string[];
    budget: string;
    accommodation: string[];
    cuisine: string[];
    travelStyle: string;
    season: string[];
  };
  profileVector: number[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  climate: string[];
  activities: string[];
  budgetRange: string;
  bestSeasons: string[];
  cuisine: string[];
  accommodationTypes: string[];
  coordinates: [number, number];
  popularityScore: number;
  seasonalTrends: Record<string, number>;
  destinationVector: number[];
}

export interface Recommendation {
  destination: Destination;
  preferenceMatch: number;
  demographicMatch: number;
  relevanceScore: number;
  seasonalBoost: number;
  finalScore: number;
  matchReasons: string[];
}

export interface RecommendationMetrics {
  totalDestinations: number;
  averageMatch: number;
  topMatchScore: number;
  rankingAccuracy: number;
  processingTime: number;
}