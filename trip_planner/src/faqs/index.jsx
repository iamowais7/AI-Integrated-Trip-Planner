import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Footer from '@/view-trip/components/Footer';

const faqs = [
  {
    question: "How does the AI generate travel plans?",
    answer: "The AI uses your input (destination, days, budget, traveler type) and accesses real-time data to create a detailed day-by-day itinerary with hotels, places to visit, and travel tips.",
  },
  {
    question: "Can I customize the generated travel plan?",
    answer: "Yes, after the AI generates the plan, you can modify destinations, change hotels, or update your preferences to get a revised plan.",
  },
   {
    question: "Does the AI Trip Planner suggest places to visit?",
  answer: "Yes, it provides a detailed list of places to visit each day, including tourist attractions, landmarks, and activities based on your preferences and travel type.",
  },
  {
    question: "Does it include hotel booking options?",
    answer: "The app suggests hotel options with details such as price, rating, and location, but direct booking may redirect you to trusted third-party platforms.",
  },
  {
    question: "Is real-time weather or local events considered?",
    answer: "Future versions may include weather forecasts and local events. Currently, the focus is on optimized plans using location data and best times to visit.",
  },
  {
    question: "What types of travelers does it support?",
    answer: "It supports various traveler types including solo, couples, family, adventure seekers, and luxury travelers, adjusting the plan accordingly.",
  },
  {
    question: "Is the AI trained on real travel data?",
    answer: "Yes, the AI is prompted using curated templates and real-time API data from Google and other sources for accuracy and relevance.",
  },
   {
    question: "Is this planner free to use?",
    answer: "Currently, the basic version is free. Advanced features may be part of a premium tier in the future.",
  },
  {
     question: "How can I report an issue or get support?",
  answer: "If you have any error, you can reach me at khan.owais0555@gmail.com.",
  },
  {
    question: "Who developed this project?",
    answer: "This project was developed by Mohammad Owais Khan as part of an academic submission under the supervision of Dr. Mohammad Nadeem in 2025.",
  },
];

function FAQs() {
     const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
   <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 text-white py-4 px-6 rounded-2xl shadow-lg inline-block">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur border border-gray-200 shadow-lg rounded-2xl p-4 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                {isOpen ? (
                  <Minus className="text-blue-600 w-5 h-5" />
                ) : (
                  <Plus className="text-blue-600 w-5 h-5" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-3 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default FAQs
