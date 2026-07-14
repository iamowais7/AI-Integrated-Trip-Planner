import { nanoid } from 'nanoid';
import Trip from '../models/Trip.js';

export const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userEmail !== req.user.email)
      return res.status(403).json({ message: 'Not authorized' });
    res.json(trip);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSharedTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!trip) return res.status(404).json({ message: 'Shared trip not found' });
    res.json(trip);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userEmail !== req.user.email)
      return res.status(403).json({ message: 'Not authorized' });

    const allowed = ['notes', 'userSelection'];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) trip[key] = req.body[key];
    });

    await trip.save();
    res.json(trip);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userEmail !== req.user.email)
      return res.status(403).json({ message: 'Not authorized' });
    await trip.deleteOne();
    res.json({ message: 'Trip deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const shareTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userEmail !== req.user.email)
      return res.status(403).json({ message: 'Not authorized' });

    if (!trip.shareId) trip.shareId = nanoid(10);
    trip.isPublic = true;
    await trip.save();

    res.json({ shareId: trip.shareId, shareUrl: `/share/${trip.shareId}` });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
