import React from 'react';
import { Compass, MapPin, Star, TrendingUp, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const features = [
    {
      icon: Users,
      title: 'User Profiling',
      description: 'Advanced profiling through comprehensive preference analysis and demographic matching'
    },
    {
      icon: Star,
      title: 'AI Recommendations',
      description: 'Cosine similarity and collaborative filtering algorithms for precise destination matching'
    },
    {
      icon: TrendingUp,
      title: 'Seasonal Trends',
      description: 'Real-time seasonal analysis to optimize your travel timing and experience'
    },
    {
      icon: MapPin,
      title: 'Smart Ranking',
      description: 'Multi-factor ranking system with preference match, demographic fit, and relevance scoring'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Compass className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Travel
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Recommendation System
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your perfect destinations using advanced machine learning algorithms.
            Our system analyzes your preferences, demographics, and seasonal trends to deliver
            personalized travel recommendations with scientifically-backed accuracy.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-sm font-semibold text-blue-600">Cosine Similarity</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-sm font-semibold text-green-600">Collaborative Filtering</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-sm font-semibold text-orange-600">Profile Vectorization</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-sm font-semibold text-purple-600">Ranking Accuracy</span>
            </div>
          </div>

          <button
            onClick={onStart}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Compass className="w-5 h-5 mr-2" />
            Start Personalization Survey
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Our advanced AI system follows a scientific approach to travel recommendations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Survey Parsing</h3>
              <p className="text-gray-600 text-sm">Comprehensive preference collection and demographic profiling</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Vectorization</h3>
              <p className="text-gray-600 text-sm">Transform preferences into mathematical vectors for AI analysis</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Matching</h3>
              <p className="text-gray-600 text-sm">Advanced algorithms generate ranked, personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};