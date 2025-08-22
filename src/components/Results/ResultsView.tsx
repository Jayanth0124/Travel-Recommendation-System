import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Filter } from 'lucide-react';
import { UserProfile, Recommendation, RecommendationMetrics } from '../../types';
import { RecommendationCard } from './RecommendationCard';
import { MetricsDashboard } from './MetricsDashboard';

interface ResultsViewProps {
  profile: UserProfile;
  recommendations: Recommendation[];
  metrics: RecommendationMetrics;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  profile,
  recommendations,
  metrics,
  onBack
}) => {
  const [sortBy, setSortBy] = useState<'score' | 'preference' | 'demographic'>('score');
  const [filterMinScore, setFilterMinScore] = useState(0);

  const sortedAndFiltered = React.useMemo(() => {
    let filtered = recommendations.filter(rec => rec.finalScore >= filterMinScore);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'preference':
          return b.preferenceMatch - a.preferenceMatch;
        case 'demographic':
          return b.demographicMatch - a.demographicMatch;
        default:
          return b.finalScore - a.finalScore;
      }
    });
  }, [recommendations, sortBy, filterMinScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Personalized Travel Recommendations
              </h1>
              <p className="text-gray-600 mt-1">Based on your preferences and travel profile</p>
            </div>
          </div>

          <div className="flex gap-3 self-end md:self-auto">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <MetricsDashboard metrics={metrics} />

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filter & Sort</h3>
          </div>
          
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="score">Overall Score</option>
                <option value="preference">Preference Match</option>
                <option value="demographic">Demographic Match</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Score</label>
              <select
                value={filterMinScore}
                onChange={(e) => setFilterMinScore(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={0}>All Results</option>
                <option value={70}>70%+ Match</option>
                <option value={80}>80%+ Match</option>
                <option value={90}>90%+ Match</option>
              </select>
            </div>

            <div className="flex-1 text-right">
              <div className="text-sm text-gray-600">
                Showing {sortedAndFiltered.length} of {recommendations.length} destinations
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedAndFiltered.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.destination.id}
              recommendation={recommendation}
              rank={index + 1}
            />
          ))}
        </div>

        {sortedAndFiltered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No destinations match your current filters.</div>
            <button
              onClick={() => setFilterMinScore(0)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};