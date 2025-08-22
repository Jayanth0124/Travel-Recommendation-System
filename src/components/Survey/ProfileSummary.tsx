import React from 'react';
import { User, MapPin, DollarSign, Calendar, Thermometer, Activity } from 'lucide-react';
import { UserProfile } from '../../types';
import { ProfileUtils } from '../../utils/profileUtils';

interface ProfileSummaryProps {
  profile: UserProfile;
  onEdit: () => void;
  onConfirm: () => void;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  profile,
  onEdit,
  onConfirm
}) => {
  const insights = ProfileUtils.generateProfileInsights(profile);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Travel Profile</h2>
        <p className="text-lg text-gray-600">Review your preferences before we generate personalized recommendations</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex items-center text-white">
            <User className="w-8 h-8 mr-3" />
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="opacity-90">Age {profile.age} • {profile.demographics.location}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Demographics</h4>
                <p className="text-sm text-gray-600">{profile.demographics.income}</p>
                <p className="text-sm text-gray-600">{profile.demographics.lifestyle}</p>
              </div>
            </div>

            <div className="flex items-start">
              <DollarSign className="w-6 h-6 text-green-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
                <p className="text-sm text-gray-600">{profile.preferences.budget}</p>
                <p className="text-sm text-gray-600">{profile.preferences.travelStyle}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-6 h-6 text-orange-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Seasons</h4>
                <p className="text-sm text-gray-600">{profile.preferences.season.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Thermometer className="w-6 h-6 text-red-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Climate</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.preferences.climate.slice(0, 3).map((climate) => (
                    <span key={climate} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {climate}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <Activity className="w-6 h-6 text-purple-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.preferences.activities.slice(0, 4).map((activity) => (
                    <span key={activity} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-indigo-600 rounded mt-1 mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">%</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Accommodation</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.preferences.accommodation.slice(0, 3).map((acc) => (
                    <span key={acc} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Profile Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-4">
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Generate My Recommendations
          </button>
          <button
            onClick={onEdit}
            className="w-full sm:w-auto px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};