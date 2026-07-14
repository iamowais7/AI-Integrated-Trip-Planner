import Footer from '@/view-trip/components/Footer';
import React, { useState } from 'react'

const helplineNumbers = {
  Albania: "+355-4-123-4567",
  Amsterdam: "+31-20-555-5555",
  Andorra: "+376-3-123-456",
  Argentina: "+54-11-1234-5678",
  Athens: "+30-21-1234-5678",
  Australia: "+61-2-1234-5678",
  Austria: "+43-1-123-4567",
  Azerbaijan: "+994-12-123-4567",
  Bahrain: "+973-17-123-456",
  Bangladesh: "+880-2-123-4567",
  Bangkok: "+66-2-123-4567",
  Barcelona: "+34-93-123-4567",
  Barbados: "+1-246-123-4567",
  Belarus: "+375-17-123-4567",
  Belgium: "+32-2-123-4567",
  Berlin: "+49-30-123456",
  Bolivia: "+591-2-123-4567",
  BosniaHerzegovina: "+387-33-123-456",
  Botswana: "+267-31-123-456",
  Brazil: "+55-11-1234-5678",
  Brunei: "+673-2-123-4567",
  BurkinaFaso: "+226-25-123-4567",
  Burundi: "+257-22-123-456",
  Cambodia: "+855-23-123-4567",
  Canada: "+1-416-123-4567",
  CapeTown: "+27-21-123-4567",
  CapeVerde: "+238-2-123-4567",
  CentralAfricanRepublic: "+236-21-123-4567",
  Chad: "+235-22-123-4567",
  Chile: "+56-2-123-4567",
  China: "+86-10-1234-5678",
  Colombia: "+57-1-123-4567",
  Comoros: "+269-771-1234",
  Croatia: "+385-1-123-4567",
  Cuba: "+53-7-123-4567",
  Cyprus: "+357-22-123-456",
  CzechRepublic: "+420-2-1234-5678",
  Denmark: "+45-33-123-456",
  Dhaka: "+880-2-123-9999",
  Djibouti: "+253-21-123-456",
  DominicanRepublic: "+1-809-123-4567",
  Dubai: "+971-4-123-4567",
  EastTimor: "+670-332-1234",
  Ecuador: "+593-2-123-4567",
  Egypt: "+20-2-123-4567",
  ElSalvador: "+503-2-123-4567",
  England: "+44-20-7946-0991",
  Estonia: "+372-6-123-4567",
  Eswatini: "+268-24-123-456",
  Fiji: "+679-3-123-456",
  Finland: "+358-9-123-4567",
  France: "+33-1-23456789",
  Gabon: "+241-1-123-4567",
  Gambia: "+220-441-1234",
  Germany: "+49-30-123456",
  Ghana: "+233-30-123-4567",
  Greece: "+30-21-1234-5678",
  Guatemala: "+502-2-123-4567",
  Hanoi: "+84-24-9999-0000",
  Haiti: "+509-29-123-4567",
  Havana: "+53-7-222-3333",
  Helsinki: "+358-9-999-9999",
  HongKong: "+852-1234-5678",
  Honduras: "+504-3-123-4567",
  Hungary: "+36-1-123-4567",
  Iceland: "+354-551-1234",
  India: "+91-22-1234-5678",
  Indonesia: "+62-21-1234-5678",
  Ireland: "+353-1-123-4567",
  Istanbul: "+90-212-123-4567",
  Italy: "+39-06-12345678",
  Jamaica: "+1-876-123-4567",
  Japan: "+81-3-1234-5678",
  Jordan: "+962-6-123-4567",
  Kazakhstan: "+7-7172-123-456",
  Kenya: "+254-20-123-4567",
  KualaLumpur: "+60-3-5678-9999",
  Kuwait: "+965-2-123-4567",
  Laos: "+856-21-123-456",
  Latvia: "+371-6-123-4567",
  Lebanon: "+961-1-123-456",
  Lisbon: "+351-21-222-3333",
  Lithuania: "+370-5-123-4567",
  London: "+44-20-7946-0992",
  LosAngeles: "+1-213-473-3231",
  Luxembourg: "+352-26-123-4567",
  Madrid: "+34-91-222-1111",
  Malaysia: "+60-3-1234-5678",
  Malta: "+356-21-123-456",
  Mexico: "+52-55-1234-5678",
  Moldova: "+373-22-123-456",
  Mongolia: "+976-11-123456",
  Morocco: "+212-5-1234-5678",
  Mumbai: "+91-22-9988-7766",
  Nairobi: "+254-20-888-8888",
  Nepal: "+977-1-123-4567",
  Netherlands: "+31-20-123-4567",
  NewYork: "+1-212-639-9675",
  NewZealand: "+64-9-123-4567",
  Nicaragua: "+505-2-123-4567",
  Nigeria: "+234-1-123-4567",
  Norway: "+47-22-123-456",
  Panama: "+507-2-123-4567",
  Paris: "+33-1-23456789",
  Peru: "+51-1-123-4567",
  Philippines: "+63-2-123-4567",
  Poland: "+48-22-123-4567",
  Portugal: "+351-21-123-4567",
  Prague: "+420-2-1234-5678",
  Qatar: "+974-4-123-4567",
  Rome: "+39-06-12345678",
  Russia: "+7-495-123-4567",
  SanFrancisco: "+1-415-701-2311",
  SaudiArabia: "+966-11-123-4567",
  Seoul: "+82-2-9999-8888",
  Shanghai: "+86-21-8888-7777",
  Singapore: "+65-1234-5678",
  SouthAfrica: "+27-11-123-4567",
  SouthKorea: "+82-2-123-4567",
  Spain: "+34-91-123-4567",
  Stockholm: "+46-8-111-2222",
  Sweden: "+46-8-123-4567",
  Switzerland: "+41-44-123-4567",
  Sydney: "+61-2-9999-8888",
  Thailand: "+66-2-123-4567",
  Tokyo: "+81-3-1234-5678",
  Toronto: "+1-416-392-2489",
  Turkey: "+90-212-123-4567",
  UAE: "+971-4-123-4567",
  Ukraine: "+380-44-123-4567",
  UnitedKingdom: "+44-20-1234-5678",
  USA: "+1-800-123-4567",
  Venice: "+39-041-999-8888",
  Vienna: "+43-1-999-7777",
  Vietnam: "+84-24-1234-5678",
  Warsaw: "+48-22-999-8888",
  WashingtonDC: "+1-202-123-4567",
  Zurich: "+41-44-999-8888",
  Zimbabwe: "+263-4-123-4567"         // Added Zimbabwe
};




function Help() {
      const [searchTerm, setSearchTerm] = useState("");

  // Convert helplineNumbers object into array, filter by search term
  const filteredCountries = Object.entries(helplineNumbers).filter(
    ([country]) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🌍 Global Helpline Numbers
        </h2>

        <input
          type="text"
          placeholder="🔍 Search country..."
          className="w-full mb-8 px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredCountries.length > 0 ? (
          <ul className="space-y-4">
            {filteredCountries.map(([country, number]) => (
              <li
                key={country}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-5 py-4 shadow-sm transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">
                    {country.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <a
                    href={`tel:${number}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {number}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            ❌ No matching countries found.
          </p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Help
