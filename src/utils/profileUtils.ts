import { UserProfile } from '../types';

export class ProfileUtils {
  static createProfileVector(profile: UserProfile): number[] {
    // Create a numerical representation of user preferences
    // Vector dimensions: [warmth, adventure, culture, luxury, social, nature, urban]
    
    let vector = [0, 0, 0, 0, 0, 0, 0];
    
    // Climate preferences influence warmth dimension
    const warmClimates = ['tropical', 'warm', 'mediterranean', 'desert'];
    const coldClimates = ['nordic', 'cold', 'alpine', 'mountain'];
    
    profile.preferences.climate.forEach(climate => {
      const normalizedClimate = climate.toLowerCase();
      if (warmClimates.some(warm => normalizedClimate.includes(warm))) {
        vector[0] += 0.3; // warmth
      }
      if (coldClimates.some(cold => normalizedClimate.includes(cold))) {
        vector[0] -= 0.2; // less warmth preference
      }
    });
    
    // Activities influence multiple dimensions
    const activityMappings: Record<string, number[]> = {
      'adventure': [0, 0.4, 0, 0, 0, 0.2, 0],
      'hiking': [0, 0.4, 0, 0, 0, 0.3, 0],
      'beach': [0.3, 0.1, 0, 0.2, 0.1, 0.2, 0],
      'cultural': [0, 0, 0.4, 0.1, 0, 0, 0.2],
      'historical': [0, 0, 0.4, 0, 0, 0, 0.1],
      'nightlife': [0, 0, 0, 0, 0.4, 0, 0.3],
      'shopping': [0, 0, 0.1, 0.2, 0.2, 0, 0.3],
      'food': [0, 0, 0.2, 0.2, 0.2, 0, 0.1],
      'relaxation': [0.2, -0.2, 0, 0.3, -0.1, 0.2, 0],
      'spa': [0.1, -0.2, 0, 0.4, 0, 0.1, 0],
      'wildlife': [0, 0.2, 0.1, 0, 0, 0.4, 0],
      'nature': [0, 0.1, 0, 0, 0, 0.4, 0],
      'photography': [0, 0.2, 0.2, 0, 0, 0.3, 0.1]
    };
    
    profile.preferences.activities.forEach(activity => {
      const mapping = activityMappings[activity.toLowerCase().replace(/[\/\s]/g, '')];
      if (mapping) {
        vector = vector.map((val, idx) => val + (mapping[idx] || 0));
      }
    });
    
    // Budget influences luxury dimension
    const budgetLuxuryMap: Record<string, number> = {
      'Budget (₹43.5k-₹1.3L)': -0.3,
      'Medium (₹1.3L-₹3.5L)': 0,
      'High (₹3.5L-₹7L)': 0.3,
      'Luxury (₹7L+)': 0.5
    };
    
    vector[3] += budgetLuxuryMap[profile.preferences.budget] || 0;
    
    // Travel style influences various dimensions
    const styleMappings: Record<string, number[]> = {
      'adventure': [0, 0.4, 0, -0.2, 0, 0.3, 0],
      'active': [0, 0.4, 0, -0.1, 0, 0.2, 0],
      'luxury': [0.2, 0, 0.1, 0.5, 0.1, 0, 0.2],
      'comfort': [0.2, -0.2, 0, 0.3, 0, 0, 0.1],
      'cultural': [0, 0, 0.5, 0, 0.1, 0, 0.2],
      'immersion': [0, 0.1, 0.4, 0, 0.2, 0.1, 0.1],
      'relaxed': [0.2, -0.3, 0.1, 0.2, -0.1, 0.2, 0],
      'slow': [0.1, -0.3, 0.2, 0.1, -0.1, 0.2, 0]
    };
    
    const travelStyle = profile.preferences.travelStyle.toLowerCase();
    for (const [style, mapping] of Object.entries(styleMappings)) {
      if (travelStyle.includes(style)) {
        vector = vector.map((val, idx) => val + (mapping[idx] || 0));
      }
    }
    
    // Age influences social and adventure dimensions
    if (profile.age < 30) {
      vector[1] += 0.2; // more adventure
      vector[4] += 0.3; // more social
    } else if (profile.age >= 50) {
      vector[1] -= 0.1; // less adventure
      vector[2] += 0.2; // more culture
      vector[3] += 0.1; // more luxury
    }
    
    // Normalize vector to [0, 1] range
    const maxVal = Math.max(...vector.map(Math.abs));
    if (maxVal > 0) {
      vector = vector.map(val => Math.max(0, Math.min(1, (val + 1) / 2)));
    }
    
    return vector;
  }

  static generateProfileInsights(profile: UserProfile): string[] {
    const insights: string[] = [];
    const prefs = profile.preferences;
    
    // Travel style insight
    insights.push(`You prefer ${prefs.travelStyle.toLowerCase()} travel experiences`);
    
    // Activity insights
    const topActivities = prefs.activities.slice(0, 3);
    if (topActivities.length > 0) {
      insights.push(`Your ideal trip includes ${topActivities.join(', ').toLowerCase()}`);
    }
    
    // Climate insight
    if (prefs.climate.length > 0) {
      const climatePrefs = prefs.climate.map(c => c.toLowerCase()).join(' and ');
      insights.push(`You enjoy ${climatePrefs} climates`);
    }
    
    // Budget insight
    insights.push(`Your travel budget aligns with ${prefs.budget.toLowerCase().replace(/₹[\d,.L impactfulk\-\+]+/g, '').trim()} range destinations`);
    
    // Seasonal insight
    if (prefs.season.length > 0) {
      const seasons = prefs.season.join(' and ').toLowerCase();
      insights.push(`You prefer traveling during ${seasons}`);
    }
    
    return insights.slice(0, 4);
  }
}