import Groq from 'groq-sdk';
import Trip from '../models/Trip.js';

let groq;
const getGroq = () => {
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  return groq;
};

const AI_PROMPT = `Generate a travel plan for destination: {location} for {totalDays} days.
Traveler type: {traveler}, Budget: {budget}.
Provide:
1. A list of 3-5 hotel options: hotelName, hotelAddress, price, geoCoordinates (latitude/longitude), rating (out of 5), description.
2. A day-by-day itinerary for {totalDays} days with keys day1, day2, etc. Each day: theme, bestTimeToVisit, and places array. Each place: placeName, placeDetails, geoCoordinates, ticketPricing, rating, timeTravel.
3. A short tripName.
Return ONLY valid JSON in this exact structure:
{
  "tripName": "",
  "hotels": [],
  "itinerary": { "day1": { "theme": "", "bestTimeToVisit": "", "places": [] } }
}`;

export const generateTrip = async (req, res) => {
  const { location, noOfDays, budget, traveler, startDate } = req.body;

  if (!location || !noOfDays || !budget || !traveler) {
    return res.status(400).json({ message: 'location, noOfDays, budget, traveler are required' });
  }

  try {
    const cached = await Trip.findOne({
      userEmail: req.user.email,
      'userSelection.location': location,
      'userSelection.noOfDays': noOfDays,
      'userSelection.budget': budget,
      'userSelection.traveler': traveler,
    }).sort({ createdAt: -1 });

    if (cached) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.write(`data: ${JSON.stringify({ done: true, tripId: cached._id, cached: true })}\n\n`);
      return res.end();
    }

    const prompt = AI_PROMPT
      .replace(/{location}/g, location)
      .replace(/{totalDays}/g, noOfDays)
      .replace(/{traveler}/g, traveler)
      .replace(/{budget}/g, budget);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await getGroq().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a travel planning assistant. Always respond with valid JSON only. No markdown, no explanation, just raw JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      stream: true,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const chunkText = chunk.choices[0]?.delta?.content || '';
      if (chunkText) {
        fullText += chunkText;
        res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
      }
    }

    const jsonStart = fullText.indexOf('{');
    const jsonEnd = fullText.lastIndexOf('}');
    const tripData = JSON.parse(fullText.substring(jsonStart, jsonEnd + 1));

    const trip = await Trip.create({
      userId: req.user.id,
      userEmail: req.user.email,
      userSelection: { location, noOfDays, budget, traveler, startDate: startDate || null },
      tripData,
    });

    res.write(`data: ${JSON.stringify({ done: true, tripId: trip._id })}\n\n`);
    res.end();
  } catch (err) {
    console.error('AI generation error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to generate trip' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Generation failed' })}\n\n`);
      res.end();
    }
  }
};

export const supportChat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'message is required' });
  try {
    const result = await getGroq().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful support assistant for Elixir AI Trip Planner — an app that generates personalized travel itineraries using AI. Help users with questions about the app, trip planning, features, and travel advice. Be concise and friendly.',
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });
    const reply = result.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (err) {
    console.error('Support chat error:', err.message);
    res.status(500).json({ message: 'Failed to get response' });
  }
};
