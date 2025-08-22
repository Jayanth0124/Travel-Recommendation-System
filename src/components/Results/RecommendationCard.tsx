import React from 'react';
import { MapPin, Star, TrendingUp, Users, Calendar } from 'lucide-react';
import { Recommendation } from '../../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rank
}) => {
  const { destination, preferenceMatch, demographicMatch, relevanceScore, finalScore, matchReasons } = recommendation;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`w-8 h-8 ${getScoreBadgeColor(finalScore)} rounded-full flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">#{rank}</span>
        </div>
      </div>

      {/* Overall Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1 rounded-full ${getScoreColor(finalScore)} font-bold text-sm`}>
          {finalScore}% Match
        </div>
      </div>

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">{destination.country}</span>
          <div className="ml-auto flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{destination.popularityScore}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">{destination.name}</h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>

        {/* Match Reasons */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Why it's perfect for you:</h4>
          <div className="space-y-1">
            {matchReasons.map((reason, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                {reason}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {destination.activities.slice(0, 4).map((activity) => (
              <span
                key={activity}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-gray-500">Preferences</span>
            </div>
            <div className={`font-bold text-sm ${getScoreColor(preferenceMatch).split(' ')[0]}`}>
              {preferenceMatch}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-xs text-gray-500">Demographics</span>
            </div>
            <div className={`font-bold text-sm ${getScoreColor(demographicMatch).split(' ')[0]}`}>
              {demographicMatch}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-xs text-gray-500">Relevance</span>
            </div>
            <div className={`font-bold text-sm ${getScoreColor(relevanceScore).split(' ')[0]}`}>
              {relevanceScore}%
            </div>
          </div>
        </div>

        {/* Best Seasons */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Best seasons:</span>
            <div className="flex gap-1">
              {destination.bestSeasons.map((season) => (
                <span
                  key={season}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded capitalize"
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};