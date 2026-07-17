import Footer from '@/view-trip/components/Footer';
import { useState } from 'react';
import { Phone } from 'lucide-react';

const helplineNumbers = {
  Albania: "+355-4-123-4567", Amsterdam: "+31-20-555-5555", Andorra: "+376-3-123-456",
  Argentina: "+54-11-1234-5678", Athens: "+30-21-1234-5678", Australia: "+61-2-1234-5678",
  Austria: "+43-1-123-4567", Azerbaijan: "+994-12-123-4567", Bahrain: "+973-17-123-456",
  Bangladesh: "+880-2-123-4567", Bangkok: "+66-2-123-4567", Barcelona: "+34-93-123-4567",
  Barbados: "+1-246-123-4567", Belarus: "+375-17-123-4567", Belgium: "+32-2-123-4567",
  Berlin: "+49-30-123456", Bolivia: "+591-2-123-4567", Brazil: "+55-11-1234-5678",
  Cambodia: "+855-23-123-4567", Canada: "+1-416-123-4567", CapeTown: "+27-21-123-4567",
  Chile: "+56-2-123-4567", China: "+86-10-1234-5678", Colombia: "+57-1-123-4567",
  Croatia: "+385-1-123-4567", Cuba: "+53-7-123-4567", CzechRepublic: "+420-2-1234-5678",
  Denmark: "+45-33-123-456", Dubai: "+971-4-123-4567", Egypt: "+20-2-123-4567",
  England: "+44-20-7946-0991", Finland: "+358-9-123-4567", France: "+33-1-23456789",
  Germany: "+49-30-123456", Ghana: "+233-30-123-4567", Greece: "+30-21-1234-5678",
  HongKong: "+852-1234-5678", Hungary: "+36-1-123-4567", Iceland: "+354-551-1234",
  India: "+91-22-1234-5678", Indonesia: "+62-21-1234-5678", Ireland: "+353-1-123-4567",
  Istanbul: "+90-212-123-4567", Italy: "+39-06-12345678", Jamaica: "+1-876-123-4567",
  Japan: "+81-3-1234-5678", Jordan: "+962-6-123-4567", Kenya: "+254-20-123-4567",
  Kuwait: "+965-2-123-4567", Lebanon: "+961-1-123-456", London: "+44-20-7946-0992",
  LosAngeles: "+1-213-473-3231", Malaysia: "+60-3-1234-5678", Mexico: "+52-55-1234-5678",
  Morocco: "+212-5-1234-5678", Mumbai: "+91-22-9988-7766", Nepal: "+977-1-123-4567",
  Netherlands: "+31-20-123-4567", NewYork: "+1-212-639-9675", NewZealand: "+64-9-123-4567",
  Nigeria: "+234-1-123-4567", Norway: "+47-22-123-456", Pakistan: "+92-21-1234-5678",
  Philippines: "+63-2-123-4567", Poland: "+48-22-123-4567", Portugal: "+351-21-123-4567",
  Qatar: "+974-4-123-4567", Russia: "+7-495-123-4567", SaudiArabia: "+966-11-123-4567",
  Singapore: "+65-1234-5678", SouthAfrica: "+27-11-123-4567", SouthKorea: "+82-2-123-4567",
  Spain: "+34-91-123-4567", Sweden: "+46-8-123-4567", Switzerland: "+41-44-123-4567",
  Thailand: "+66-2-123-4567", Tokyo: "+81-3-1234-5678", Toronto: "+1-416-392-2489",
  Turkey: "+90-212-123-4567", UAE: "+971-4-123-4567", UnitedKingdom: "+44-20-1234-5678",
  USA: "+1-800-123-4567", Vietnam: "+84-24-1234-5678", Zimbabwe: "+263-4-123-4567",
};

function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = Object.entries(helplineNumbers).filter(([country]) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Phone className="h-4 w-4" /> Global Helplines
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">Emergency & Travel Helpline Numbers</h1>
          <p className="text-muted-foreground mt-2 text-sm">Find local helpline numbers for your destination</p>
        </div>

        <input
          type="text"
          placeholder="Search country or city..."
          className="w-full mb-6 px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredCountries.length > 0 ? (
          <ul className="space-y-3">
            {filteredCountries.map(([country, number]) => (
              <li
                key={country}
                className="bg-card border border-border rounded-xl px-5 py-3.5 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    {country.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <a
                    href={`tel:${number}`}
                    className="text-primary hover:underline font-semibold text-sm flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" /> {number}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground mt-8">No matching countries found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Help;
