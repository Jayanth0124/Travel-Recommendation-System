import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { SurveyStep } from './components/Survey/SurveyStep';
import { ProfileSummary } from './components/Survey/ProfileSummary';
import { ResultsView } from './components/Results/ResultsView';
import { surveyQuestions } from './data/surveyQuestions';
import { recommendationEngine } from './utils/recommendationEngine';
import { ProfileUtils } from './utils/profileUtils';
import { UserProfile, Recommendation, RecommendationMetrics } from './types';

type AppState = 'welcome' | 'survey' | 'profile-summary' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [metrics, setMetrics] = useState<RecommendationMetrics | null>(null);

  const handleStartSurvey = () => {
    setCurrentState('survey');
    setCurrentStep(0);
    setSurveyAnswers({});
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canProceedFromStep = (step: number): boolean => {
    const currentStepQuestions = surveyQuestions[step].questions;
    return currentStepQuestions.every(question => {
      if (!question.required) return true;
      const answer = surveyAnswers[question.id];
      if (question.type === 'multiselect') {
        return answer && Array.isArray(answer) && answer.length > 0;
      }
      return answer !== undefined && answer !== null && answer !== '';
    });
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Create user profile
      const profile = createUserProfile();
      setUserProfile(profile);
      setCurrentState('profile-summary');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setCurrentState('welcome');
    }
  };

  const createUserProfile = (): UserProfile => {
    const profile: UserProfile = {
      id: `user_${Date.now()}`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
      age: surveyAnswers.age || 30,
      demographics: {
        location: surveyAnswers.location || 'Unknown',
        income: surveyAnswers.income || 'Not specified',
        lifestyle: surveyAnswers.lifestyle || 'Not specified'
      },
      preferences: {
        climate: surveyAnswers.climate || [],
        activities: surveyAnswers.activities || [],
        budget: surveyAnswers.budget || 'Medium ($1500-$4000)',
        accommodation: surveyAnswers.accommodation || [],
        cuisine: surveyAnswers.cuisine || [],
        travelStyle: surveyAnswers.travelStyle || 'Relaxed/Slow',
        season: surveyAnswers.season || []
      },
      profileVector: []
    };

    // Generate profile vector
    profile.profileVector = ProfileUtils.createProfileVector(profile);
    
    return profile;
  };

  const handleGenerateRecommendations = () => {
    if (!userProfile) return;

    // Get current season (simplified)
    const now = new Date();
    const month = now.getMonth();
    const currentSeason = month < 3 ? 'winter' : month < 6 ? 'spring' : month < 9 ? 'summer' : 'fall';

    const result = recommendationEngine.generateRecommendations(userProfile, currentSeason);
    setRecommendations(result.recommendations);
    setMetrics(result.metrics);
    setCurrentState('results');
  };

  const handleEditProfile = () => {
    setCurrentState('survey');
    setCurrentStep(0);
  };

  const handleBackToWelcome = () => {
    setCurrentState('welcome');
    setCurrentStep(0);
    setSurveyAnswers({});
    setUserProfile(null);
    setRecommendations([]);
    setMetrics(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentState === 'welcome' && (
        <WelcomeScreen onStart={handleStartSurvey} />
      )}

      {currentState === 'survey' && (
        <div className="container mx-auto px-4 py-12">
          <SurveyStep
            title={surveyQuestions[currentStep].title}
            questions={surveyQuestions[currentStep].questions}
            answers={surveyAnswers}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStep === 0}
            isLast={currentStep === surveyQuestions.length - 1}
            canProceed={canProceedFromStep(currentStep)}
          />
        </div>
      )}

      {currentState === 'profile-summary' && userProfile && (
        <div className="container mx-auto px-4 py-12">
          <ProfileSummary
            profile={userProfile}
            onEdit={handleEditProfile}
            onConfirm={handleGenerateRecommendations}
          />
        </div>
      )}

      {currentState === 'results' && userProfile && recommendations.length > 0 && metrics && (
        <ResultsView
          profile={userProfile}
          recommendations={recommendations}
          metrics={metrics}
          onBack={handleBackToWelcome}
        />
      )}
    </div>
  );
}

export default App;