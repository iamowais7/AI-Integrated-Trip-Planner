export async function exportTripPdf(trip) {
  const html2pdf = (await import('html2pdf.js')).default;

  const itinerary = trip?.tripData?.itinerary || {};
  const days = Object.keys(itinerary).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const daysHtml = days.map((dayKey) => {
    const day = itinerary[dayKey];
    const places = (day.places || []).map((p) => `
      <div style="margin-bottom:12px; padding:10px; border:1px solid #e5e7eb; border-radius:10px;">
        <strong>${p.placeName}</strong>
        <p style="color:#6b7280; font-size:13px; margin:4px 0;">${p.placeDetails || ''}</p>
        <div style="display:flex; gap:16px; font-size:12px; color:#9ca3af;">
          ${p.ticketPricing ? `<span>🎟 ${p.ticketPricing}</span>` : ''}
          ${p.rating ? `<span>⭐ ${p.rating}</span>` : ''}
          ${p.timeTravel ? `<span>🕐 ${p.timeTravel}</span>` : ''}
        </div>
      </div>`).join('');

    return `
      <div style="margin-bottom:24px;">
        <h3 style="font-size:16px; font-weight:700; text-transform:capitalize; margin-bottom:4px;">${dayKey}</h3>
        ${day.theme ? `<p style="color:#6b7280; font-size:13px; margin-bottom:10px;">${day.theme}</p>` : ''}
        ${places}
      </div>`;
  }).join('');

  const hotelsHtml = (trip?.tripData?.hotels || []).map((h) => `
    <div style="margin-bottom:10px; padding:10px; border:1px solid #e5e7eb; border-radius:10px;">
      <strong>${h.hotelName}</strong>
      <p style="color:#6b7280; font-size:13px; margin:4px 0;">📍 ${h.hotelAddress}</p>
      <p style="font-size:13px;">💰 ${h.price} &nbsp; ⭐ ${h.rating}</p>
    </div>`).join('');

  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; padding: 32px; max-width: 700px;">
      <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">${trip?.userSelection?.location}</h1>
      <p style="color: #6b7280; margin-bottom: 24px;">
        📅 ${trip?.userSelection?.noOfDays} days &nbsp;|&nbsp;
        💰 ${trip?.userSelection?.budget} budget &nbsp;|&nbsp;
        👥 ${trip?.userSelection?.traveler}
      </p>

      ${trip?.notes ? `<div style="background:#f3f4f6; border-radius:10px; padding:12px; margin-bottom:24px; color:#374151;">
        <strong>Notes:</strong> ${trip.notes}
      </div>` : ''}

      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Hotels</h2>
      ${hotelsHtml}

      <h2 style="font-size: 20px; font-weight: 700; margin: 24px 0 12px;">Day-by-Day Itinerary</h2>
      ${daysHtml}
    </div>`;

  const opt = {
    margin: 0,
    filename: `${trip?.userSelection?.location?.replace(/\s+/g, '_')}_trip.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(element).save();
}
