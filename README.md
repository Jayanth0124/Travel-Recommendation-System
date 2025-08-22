# Triply - AI-Powered Travel Recommendation System ✈️

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**An intelligent travel recommendation engine that uses advanced profiling and machine learning to suggest personalized destinations.**

### **[Visit the Live Application 🚀](https://triplyai.netlify.app/)**

</div>

<br/>


---

## ✨ Core Features

* **🧠 Intelligent User Profiling**: A multi-step survey captures detailed demographic data and travel preferences.
* **🤖 AI-Powered Recommendations**: Utilizes **Cosine Similarity** and collaborative filtering to match user profiles with ideal destinations from a curated dataset.
* **📈 Dynamic Scoring System**: Each recommendation is given a final score based on preference match, demographic alignment, seasonal trends, and destination popularity.
* **📊 In-Depth Analytics**: The results page features a detailed dashboard with metrics like processing time, ranking accuracy, and average match score.
* **📱 Fully Mobile-Responsive**: A clean, modern UI built with Tailwind CSS that works beautifully on all devices.
* **🔍 SEO Optimized**: Implemented best practices for SEO, including meta tags and Open Graph protocols for social sharing.
* **🇮🇳 Currency Conversion**: All financial data is localized to Indian Rupees (₹).

---

## ⚙️ How It Works

Triply's recommendation engine transforms qualitative user preferences into a quantitative model to deliver precise and logical travel suggestions.

1.  **Survey & Profiling**: The user completes a comprehensive survey.
2.  **Profile Vectorization**: The system converts the survey answers into a multi-dimensional numerical vector representing the user's unique travel persona. The vector dimensions include factors like warmth, adventure, culture, luxury, and social preferences.
3.  **Destination Matching**: Each destination in the database also has a pre-computed vector. The engine calculates the **Cosine Similarity** between the user's vector and each destination's vector to find the closest match.
4.  **Weighted Scoring**: The final recommendation score is a weighted average of:
    * Preference Match (Cosine Similarity)
    * Demographic Match
    * Seasonal Boost
    * Collaborative Filtering Score (based on destination popularity)

---

## 🛠️ Tech Stack

| Technology      | Purpose                                                      |
| :-------------- | :----------------------------------------------------------- |
| **React** | Core UI library for building the user interface.             |
| **Vite** | Next-generation frontend tooling for a fast development experience. |
| **TypeScript** | For strong typing and improved code quality.                 |
| **Tailwind CSS**| A utility-first CSS framework for rapid, responsive UI design. |
| **Lucide React**| Beautiful and consistent icons.                              |

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Jayanth0124/Travel-Recommendation-System.git](https://github.com/Jayanth0124/Travel-Recommendation-System.git)
    cd Travel-Recommendation-System
    ```

2.  **Install dependencies:**
    *(It is recommended to use a Node.js LTS version like v20)*
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ✍️ Author

This project was designed and developed by **Donavalli Jayanth**.

[![Portfolio](https://img.shields.io/badge/Website-jayanth.site-blue?style=flat&logo=world)](http://www.jayanth.site)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Donavalli%20Jayanth-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/jayanth-donavalli)