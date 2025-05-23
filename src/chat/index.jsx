import Footer from '@/view-trip/components/Footer';
import axios from 'axios';
import React, { useState } from 'react';

function Chat() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskHelp = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const result = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBzjwj3tGksxTeETx1f2vUW0fscD2TaJ2I",
        {
          contents: [
            {
              parts: [{ text: userInput }],
            },
          ],
        }
      );

      const aiText = result.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(aiText || "No helpful response received.");
    } catch (error) {
      console.error("Error getting help:", error);
      setResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Support Assistant</h2>

        <textarea
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
          placeholder="Describe the help you need..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button
          onClick={handleAskHelp}
         className="w-full bg-black text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-800 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask "}
        </button>

        {response && (
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-inner text-gray-800">
            <h3 className="font-semibold mb-2">🤖 AI Response:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Chat;
