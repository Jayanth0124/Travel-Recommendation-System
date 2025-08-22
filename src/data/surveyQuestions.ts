export const surveyQuestions = [
  {
    id: 'demographics',
    title: 'Tell us about yourself',
    questions: [
      {
        id: 'age',
        text: 'What is your age?',
        type: 'number' as const,
        required: true
      },
      {
        id: 'location',
        text: 'Where are you currently located?',
        type: 'select' as const,
        options: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
        required: true
      },
      {
        id: 'income',
        text: 'What is your approximate annual household income?',
        type: 'select' as const,
        options: ['₹5L-₹10L', '₹10L-₹20L', '₹20L-₹50L', '₹50L-₹1Cr', 'Over ₹1Cr'],
        required: true
      },
      {
        id: 'lifestyle',
        text: 'How would you describe your lifestyle?',
        type: 'select' as const,
        options: ['Minimalist', 'Active/Outdoorsy', 'Urban/Professional', 'Family-oriented', 'Bohemian/Artistic'],
        required: true
      }
    ]
  },
  {
    id: 'preferences',
    title: 'Travel Preferences',
    questions: [
      {
        id: 'climate',
        text: 'What climate do you prefer? (Select all that apply)',
        type: 'multiselect' as const,
        options: ['Tropical/Warm', 'Mediterranean', 'Temperate', 'Alpine/Mountain', 'Desert', 'Nordic/Cold'],
        required: true
      },
      {
        id: 'activities',
        text: 'What activities interest you most? (Select all that apply)',
        type: 'multiselect' as const,
        options: ['Beach/Water Sports', 'Hiking/Adventure', 'Cultural/Historical', 'Food/Cuisine', 'Shopping', 'Nightlife', 'Wildlife/Nature', 'Photography', 'Relaxation/Spa'],
        required: true
      },
      {
        id: 'budget',
        text: 'What is your typical travel budget per person?',
        type: 'select' as const,
        options: ['Budget (₹43.5k-₹1.3L)', 'Medium (₹1.3L-₹3.5L)', 'High (₹3.5L-₹7L)', 'Luxury (₹7L+)'],
        required: true
      },
      {
        id: 'accommodation',
        text: 'What type of accommodation do you prefer? (Select all that apply)',
        type: 'multiselect' as const,
        options: ['Hotel', 'Resort', 'Boutique/B&B', 'Hostel', 'Vacation Rental', 'Eco-lodge', 'Unique (Overwater, Treehouse)'],
        required: true
      },
      {
        id: 'cuisine',
        text: 'What cuisines excite you? (Select all that apply)',
        type: 'multiselect' as const,
        options: ['Local/Traditional', 'Asian', 'Mediterranean', 'Seafood', 'Vegetarian/Vegan', 'Fine Dining', 'Street Food', 'International'],
        required: true
      },
      {
        id: 'travelStyle',
        text: 'What describes your travel style?',
        type: 'select' as const,
        options: ['Planned/Structured', 'Spontaneous/Flexible', 'Adventure/Active', 'Relaxed/Slow', 'Cultural Immersion', 'Luxury/Comfort'],
        required: true
      },
      {
        id: 'season',
        text: 'When do you prefer to travel? (Select all that apply)',
        type: 'multiselect' as const,
        options: ['Spring', 'Summer', 'Fall', 'Winter'],
        required: true
      }
    ]
  }
];