import { UserProfile, Destination, Recommendation, RecommendationMetrics } from '../types';
import { destinations } from '../data/destinations';

export class RecommendationEngine {
  private weightings = {
    preference: 0.4,
    demographic: 0.2,
    seasonal: 0.25,
    collaborative: 0.15
  };

  generateRecommendations(userProfile: UserProfile, currentSeason: string): {
    recommendations: Recommendation[];
    metrics: RecommendationMetrics;
  } {
    const startTime = Date.now();
    
    const recommendations = destinations.map(destination => {
      const preferenceMatch = this.calculatePreferenceMatch(userProfile, destination);
      const demographicMatch = this.calculateDemographicMatch(userProfile, destination);
      const seasonalBoost = this.calculateSeasonalBoost(destination, currentSeason);
      const collaborativeScore = this.calculateCollaborativeFiltering(userProfile, destination);
      
      const relevanceScore = (
        preferenceMatch * this.weightings.preference +
        demographicMatch * this.weightings.demographic +
        seasonalBoost * this.weightings.seasonal +
        collaborativeScore * this.weightings.collaborative
      );

      const finalScore = Math.min(100, relevanceScore * 100);

      return {
        destination,
        preferenceMatch: Math.round(preferenceMatch * 100),
        demographicMatch: Math.round(demographicMatch * 100),
        relevanceScore: Math.round(relevanceScore * 100),
        seasonalBoost: Math.round(seasonalBoost * 100),
        finalScore: Math.round(finalScore),
        matchReasons: this.generateMatchReasons(userProfile, destination, preferenceMatch)
      };
    });

    // Sort by final score
    recommendations.sort((a, b) => b.finalScore - a.finalScore);

    const processingTime = Date.now() - startTime;
    
    const metrics: RecommendationMetrics = {
      totalDestinations: destinations.length,
      averageMatch: Math.round(recommendations.reduce((sum, rec) => sum + rec.finalScore, 0) / recommendations.length),
      topMatchScore: recommendations[0]?.finalScore || 0,
      rankingAccuracy: this.calculateRankingAccuracy(recommendations),
      processingTime
    };

    return { recommendations, metrics };
  }

  private calculatePreferenceMatch(profile: UserProfile, destination: Destination): number {
    // Use cosine similarity between profile vector and destination vector
    return this.cosineSimilarity(profile.profileVector, destination.destinationVector);
  }

  private calculateDemographicMatch(profile: UserProfile, destination: Destination): number {
    let score = 0;
    let factors = 0;

    // Age-based matching
    if (profile.age < 30 && destination.activities.includes('nightlife')) score += 0.3;
    if (profile.age >= 30 && profile.age < 50 && destination.activities.includes('cultural')) score += 0.3;
    if (profile.age >= 50 && destination.activities.includes('relaxation')) score += 0.3;
    factors += 0.3;

    // Income-based matching
    const budgetMatch = this.matchBudget(profile.demographics.income, destination.budgetRange);
    score += budgetMatch * 0.4;
    factors += 0.4;

    // Lifestyle matching
    const lifestyleMatch = this.matchLifestyle(profile.demographics.lifestyle, destination);
    score += lifestyleMatch * 0.3;
    factors += 0.3;

    return factors > 0 ? score / factors : 0;
  }

  private calculateSeasonalBoost(destination: Destination, currentSeason: string): number {
    const seasonKey = currentSeason.toLowerCase() as keyof typeof destination.seasonalTrends;
    return (destination.seasonalTrends[seasonKey] || 50) / 100;
  }

  private calculateCollaborativeFiltering(profile: UserProfile, destination: Destination): number {
    // Simplified collaborative filtering based on destination popularity and user preferences
    const popularityScore = destination.popularityScore / 100;
    const preferenceAlignment = this.calculatePreferenceAlignment(profile, destination);
    
    return (popularityScore + preferenceAlignment) / 2;
  }

  private cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private matchBudget(userBudget: string, destinationBudget: string): number {
    const budgetMap: Record<string, number> = {
      'Budget (₹43.5k-₹1.3L)': 1,
      'Medium (₹1.3L-₹3.5L)': 2,
      'High (₹3.5L-₹7L)': 3,
      'Luxury (₹7L+)': 4,
      'medium': 2,
      'high': 3,
      'luxury': 4
    };

    const userLevel = budgetMap[userBudget] || 2;
    const destLevel = budgetMap[destinationBudget] || 2;
    const diff = Math.abs(userLevel - destLevel);
    
    return Math.max(0, 1 - diff * 0.25);
  }

  private matchLifestyle(lifestyle: string, destination: Destination): number {
    const lifestyleActivityMap: Record<string, string[]> = {
      'Active/Outdoorsy': ['hiking', 'adventure', 'wildlife'],
      'Urban/Professional': ['cultural', 'shopping', 'nightlife'],
      'Family-oriented': ['beach', 'sightseeing', 'cultural'],
      'Bohemian/Artistic': ['cultural', 'photography', 'unique experiences'],
      'Minimalist': ['relaxation', 'nature', 'simple experiences']
    };

    const preferredActivities = lifestyleActivityMap[lifestyle] || [];
    const matchingActivities = destination.activities.filter(activity => 
      preferredActivities.some(pref => activity.includes(pref) || pref.includes(activity))
    );

    return matchingActivities.length / Math.max(preferredActivities.length, 1);
  }

  private calculatePreferenceAlignment(profile: UserProfile, destination: Destination): number {
    let alignmentScore = 0;
    let totalChecks = 0;

    // Climate alignment
    const climateMatch = profile.preferences.climate.some(pref => 
      destination.climate.some(climate => this.matchPreference(pref, climate))
    );
    alignmentScore += climateMatch ? 1 : 0;
    totalChecks++;

    // Activity alignment
    const activityMatches = profile.preferences.activities.filter(pref => 
      destination.activities.some(activity => this.matchPreference(pref, activity))
    ).length;
    alignmentScore += Math.min(1, activityMatches / profile.preferences.activities.length);
    totalChecks++;

    // Cuisine alignment
    const cuisineMatch = profile.preferences.cuisine.some(pref => 
      destination.cuisine.some(cuisine => this.matchPreference(pref, cuisine))
    );
    alignmentScore += cuisineMatch ? 1 : 0;
    totalChecks++;

    return totalChecks > 0 ? alignmentScore / totalChecks : 0;
  }

  private matchPreference(userPref: string, destinationFeature: string): boolean {
    const normalized1 = userPref.toLowerCase().replace(/[\/\-\s]/g, '');
    const normalized2 = destinationFeature.toLowerCase().replace(/[\/\-\s]/g, '');
    
    return normalized1.includes(normalized2) || 
           normalized2.includes(normalized1) ||
           this.semanticMatch(normalized1, normalized2);
  }

  private semanticMatch(pref1: string, pref2: string): boolean {
    const semanticMaps: Record<string, string[]> = {
      'beach': ['water', 'coastal', 'ocean', 'sea'],
      'adventure': ['hiking', 'outdoor', 'extreme', 'active'],
      'cultural': ['historical', 'heritage', 'traditional', 'local'],
      'relaxation': ['spa', 'peaceful', 'calm', 'zen'],
      'food': ['cuisine', 'culinary', 'dining', 'gastronomy'],
      'warm': ['tropical', 'hot', 'sunny'],
      'cold': ['alpine', 'nordic', 'snowy', 'winter']
    };

    for (const [key, values] of Object.entries(semanticMaps)) {
      if ((pref1.includes(key) && values.some(v => pref2.includes(v))) ||
          (pref2.includes(key) && values.some(v => pref1.includes(v)))) {
        return true;
      }
    }

    return false;
  }

  private generateMatchReasons(profile: UserProfile, destination: Destination, match: number): string[] {
    const reasons: string[] = [];

    // Activity matches
    const matchingActivities = profile.preferences.activities.filter(activity =>
      destination.activities.some(destActivity => this.matchPreference(activity, destActivity))
    );
    if (matchingActivities.length > 0) {
      reasons.push(`Perfect for ${matchingActivities.slice(0, 2).join(' & ').toLowerCase()}`);
    }

    // Climate match
    const matchingClimate = profile.preferences.climate.find(climate =>
      destination.climate.some(destClimate => this.matchPreference(climate, destClimate))
    );
    if (matchingClimate) {
      reasons.push(`Ideal ${matchingClimate.toLowerCase()} climate`);
    }

    // Budget match
    const budgetCompatible = this.matchBudget(profile.preferences.budget, destination.budgetRange) > 0.7;
    if (budgetCompatible) {
      reasons.push('Within your budget range');
    }

    // High overall match
    if (match > 0.8) {
      reasons.push('Exceptional match for your profile');
    }

    return reasons.slice(0, 3); // Limit to 3 reasons
  }

  private calculateRankingAccuracy(recommendations: Recommendation[]): number {
    // Simulated ranking accuracy based on score distribution
    const topScores = recommendations.slice(0, 5).map(r => r.finalScore);
    const averageTopScore = topScores.reduce((sum, score) => sum + score, 0) / topScores.length;
    
    // Calculate how well-distributed the top recommendations are
    const scoreVariance = topScores.reduce((sum, score) => sum + Math.pow(score - averageTopScore, 2), 0) / topScores.length;
    
    // Higher variance indicates better ranking accuracy (clear differentiation)
    return Math.min(95, 60 + Math.sqrt(scoreVariance) * 2);
  }
}

export const recommendationEngine = new RecommendationEngine();