import { DollarSign, Hotel, Ticket, Car, Users } from 'lucide-react';

function parsePrice(str) {
  if (!str || typeof str !== 'string') return null;
  const lower = str.toLowerCase().trim();
  if (lower === 'free' || lower === '0' || lower.includes('free')) return 0;
  const numbers = str.match(/[\d,]+(?:\.\d+)?/g)?.map((n) => parseFloat(n.replace(/,/g, '')));
  if (!numbers || numbers.length === 0) return null;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function formatCurrency(num) {
  if (num === null || num === undefined) return '—';
  if (num === 0) return 'Free';
  return `$${Math.round(num).toLocaleString()}`;
}

function CostEstimator({ trip }) {
  if (!trip?.tripData) return null;

  const { hotels = [], itinerary = {} } = trip.tripData;
  const noOfDays = trip.userSelection?.noOfDays || 1;
  const traveler = trip.userSelection?.traveler || '1 person';
  const travelers = parseInt(traveler.match(/\d+/)?.[0] || '1');

  // Hotel costs — avg of all options × days
  const hotelPrices = hotels.map((h) => parsePrice(h.price)).filter((p) => p !== null);
  const avgHotelPerNight = hotelPrices.length ? hotelPrices.reduce((a, b) => a + b, 0) / hotelPrices.length : null;
  const hotelTotal = avgHotelPerNight !== null ? avgHotelPerNight * noOfDays : null;

  // Activity costs — sum all ticket prices × travelers
  const allPlaces = Object.values(itinerary).flatMap((day) => day.places || []);
  const ticketPrices = allPlaces.map((p) => parsePrice(p.ticketPricing)).filter((p) => p !== null);
  const activitiesTotal = ticketPrices.length ? ticketPrices.reduce((a, b) => a + b, 0) * travelers : null;

  // Transport estimate — rough: $30/day per person
  const transportEstimate = 30 * noOfDays * travelers;

  const grandTotal =
    (hotelTotal ?? 0) + (activitiesTotal ?? 0) + transportEstimate;

  const rows = [
    {
      icon: <Hotel className="h-4 w-4 text-blue-500" />,
      label: 'Hotels',
      detail: `${formatCurrency(avgHotelPerNight)}/night × ${noOfDays} night${noOfDays > 1 ? 's' : ''}`,
      amount: hotelTotal,
      note: 'avg of AI-suggested options',
    },
    {
      icon: <Ticket className="h-4 w-4 text-orange-500" />,
      label: 'Activities & Entry',
      detail: `${ticketPrices.length} ticketed places × ${travelers} person${travelers > 1 ? 's' : ''}`,
      amount: activitiesTotal,
      note: 'based on AI ticket estimates',
    },
    {
      icon: <Car className="h-4 w-4 text-green-500" />,
      label: 'Local Transport',
      detail: `~$30/day × ${noOfDays} days × ${travelers} person${travelers > 1 ? 's' : ''}`,
      amount: transportEstimate,
      note: 'rough estimate',
    },
  ];

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 px-5 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-base">Estimated Budget</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {travelers} traveler{travelers > 1 ? 's' : ''} · {noOfDays} day{noOfDays > 1 ? 's' : ''}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="shrink-0">{row.icon}</div>
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.detail}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatCurrency(row.amount)}</p>
              <p className="text-xs text-muted-foreground">{row.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-primary/5 px-5 py-4 flex items-center justify-between border-t border-border">
        <p className="font-bold text-base">Estimated Total</p>
        <div className="text-right">
          <p className="text-xl font-extrabold text-primary">{formatCurrency(grandTotal)}</p>
          <p className="text-xs text-muted-foreground">approximate · prices may vary</p>
        </div>
      </div>
    </div>
  );
}

export default CostEstimator;
