import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  placeName:    String,
  placeDetails: String,
  placeImageUrl: String,
  geoCoordinates: { latitude: Number, longitude: Number },
  ticketPricing: String,
  rating:       Number,
  timeTravel:   String,
}, { _id: false });

const daySchema = new mongoose.Schema({
  theme:          String,
  bestTimeToVisit: String,
  places:         [placeSchema],
}, { _id: false });

const hotelSchema = new mongoose.Schema({
  hotelName:    String,
  hotelAddress: String,
  price:        String,
  hotelImageUrl: String,
  geoCoordinates: { latitude: Number, longitude: Number },
  rating:       Number,
  description:  String,
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  shareId:   { type: String, unique: true, sparse: true },
  isPublic:  { type: Boolean, default: false },
  notes:     { type: String, default: '' },
  userSelection: {
    location:  String,
    noOfDays:  Number,
    budget:    String,
    traveler:  String,
    startDate: Date,
  },
  tripData: {
    tripName: String,
    hotels:   [hotelSchema],
    itinerary: { type: Map, of: daySchema },
  },
}, { timestamps: true });

tripSchema.index({ userEmail: 1 });

export default mongoose.model('Trip', tripSchema);
