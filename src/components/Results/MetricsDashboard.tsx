import React from 'react';
import { BarChart3, Target, Clock, TrendingUp } from 'lucide-react';
import { RecommendationMetrics } from '../../types';

interface MetricsDashboardProps {
  metrics: RecommendationMetrics;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">Recommendation Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalDestinations}</div>
          <div className="text-sm text-gray-600">Destinations Analyzed</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.averageMatch}%</div>
          <div className="text-sm text-gray-600">Average Match Score</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">★</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.topMatchScore}%</div>
          <div className="text-sm text-gray-600">Top Match Score</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.processingTime}ms</div>
          <div className="text-sm text-gray-600">Processing Time</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Ranking Accuracy</span>
          <span className="text-lg font-bold text-gray-900">{metrics.rankingAccuracy.toFixed(1)}%</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${metrics.rankingAccuracy}%` }}
          />
        </div>
      </div>
    </div>
  );
};