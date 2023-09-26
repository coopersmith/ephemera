// Your API details remain unchanged
const API_URL = 'https://api.airtable.com/v0/appSDh51MiE2vHKEZ/tbl6Y7weXgHGBUO3S';
const API_KEY = 'key0aOgJtjQGR65d3';

fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
})
.then(response => response.json())
.then(data => {
  let records = data.records;
  
  // Sorting records based on the date, from newest to oldest
  records = records.sort((a, b) => {
    const dateA = new Date(a.fields.date);
    const dateB = new Date(b.fields.date);
    return dateB - dateA;  // For descending order
  });

  const gallery = document.getElementById('gallery');
  
  records.forEach(record => {
    if (record.fields.images && record.fields.images.length > 0) {
      const imageUrl = record.fields.images[0].url;
      const venue = record.fields.venue || 'Unknown Venue';
      const date = record.fields.date || 'Unknown Date';
  
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-wrapper';
  
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
  
      const infoOverlay = document.createElement('div');
      infoOverlay.className = 'info-overlay';
  
      const venueElement = document.createElement('span');
      venueElement.textContent = `Venue: ${venue}`;
  
      const dateElement = document.createElement('span');
      dateElement.textContent = `Date: ${date}`;
  
      infoOverlay.appendChild(venueElement);
      infoOverlay.appendChild(dateElement);
  
      imgWrapper.appendChild(imgElement);
      imgWrapper.appendChild(infoOverlay);
      gallery.appendChild(imgWrapper);
    } else {
      console.warn('Image not found for record:', record.id);
    }
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});
