import React from 'react';
import { Check } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
}

interface SurveyStepProps {
  title: string;
  questions: Question[];
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
}

export const SurveyStep: React.FC<SurveyStepProps> = ({
  title,
  questions,
  answers,
  onAnswerChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
  canProceed
}) => {
  const handleMultiSelectChange = (questionId: string, option: string) => {
    const currentValues = answers[questionId] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((v: string) => v !== option)
      : [...currentValues, option];
    onAnswerChange(questionId, newValues);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: isFirst ? '33%' : isLast ? '100%' : '66%' }}
          />
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {question.type === 'text' && (
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your answer..."
              />
            )}

            {question.type === 'number' && (
              <input
                type="number"
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your age..."
                min="18"
                max="100"
              />
            )}

            {question.type === 'select' && (
              <select
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an option...</option>
                {question.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}

            {question.type === 'multiselect' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options?.map((option) => {
                  const isSelected = (answers[question.id] || []).includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleMultiSelectChange(question.id, option)}
                      className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isFirst
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Generate Recommendations' : 'Next'}
        </button>
      </div>
    </div>
  );
};