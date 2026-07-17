import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Footer from '@/view-trip/components/Footer';

const faqs = [
  { question: "How does the AI generate travel plans?", answer: "The AI uses your input (destination, days, budget, traveler type) to create a detailed day-by-day itinerary with hotels, places to visit, and travel tips." },
  { question: "Can I customize the generated travel plan?", answer: "Yes, after the AI generates the plan, you can edit trip notes and preferences using the Edit button on the trip page." },
  { question: "Does the AI Trip Planner suggest places to visit?", answer: "Yes, it provides a detailed list of places to visit each day, including tourist attractions, landmarks, and activities based on your preferences." },
  { question: "Does it include hotel booking options?", answer: "The app suggests hotel options with price, rating, and location. Each hotel has a direct 'Book Now' link to Booking.com." },
  { question: "Is real-time weather considered?", answer: "Yes! The app includes a 7-day weather forecast for your destination powered by Open-Meteo API." },
  { question: "What types of travelers does it support?", answer: "Solo adventurers, couples, families, and groups — the AI adjusts the itinerary based on your traveler type." },
  { question: "Can I share my trip with others?", answer: "Yes, use the Share button on any trip to generate a public link. Anyone can view it without logging in." },
  { question: "Can I download my itinerary as PDF?", answer: "Yes, click the PDF button on your trip overview to download a styled PDF of your complete itinerary." },
  { question: "Is this planner free to use?", answer: "Yes, the app is completely free to use with no subscription required." },
  { question: "How can I report an issue or get support?", answer: "Use the Support page (Chat) to ask our AI assistant, or reach the developer at khan.owais0555@gmail.com." },
  { question: "Who developed this project?", answer: "Elixir AI Trip Planner was developed by Owais Khan. Visit owaisfolio.vercel.app to learn more." },
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-sm">Everything you need to know about Elixir AI Trip Planner</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-border rounded-2xl bg-card overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full text-left px-5 py-4 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.question}</span>
                  {isOpen
                    ? <Minus className="text-primary w-4 h-4 shrink-0" />
                    : <Plus className="text-primary w-4 h-4 shrink-0" />
                  }
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
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
      <Footer />
    </div>
  );
}

export default FAQs;
