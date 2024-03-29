// Airtable
const API_URL = 'https://api.airtable.com/v0/appSDh51MiE2vHKEZ/tbl6Y7weXgHGBUO3S';
const PAT = 'patOJA1hglsTmpatzZ0y33NK1Bcv1C.1953af55ba439e9fb730f6848fe02005a35db5b02f29efe7781bf6aa04ac387b';

// Function to hide the loading spinner
function hideLoadingIndicator() {
  document.getElementById('loading').style.display = 'none';
}

fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${PAT}`
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
      const location = record.fields.location || 'Unknown Location';  // New line for location
      const date = record.fields.date || 'Unknown Date';
  
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-wrapper';
  
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
  
      const infoOverlay = document.createElement('div');
      infoOverlay.className = 'info-overlay';
  
      const venueElement = document.createElement('span');
      venueElement.textContent = `${venue}`;
      
      const locationElement = document.createElement('span');  // New element for location
      locationElement.textContent = `${location}`;

      const dateElement = document.createElement('span');
      dateElement.textContent = `${date}`;
  
      infoOverlay.appendChild(venueElement);
      infoOverlay.appendChild(locationElement);  // New line to append location
      infoOverlay.appendChild(dateElement);
  
      imgWrapper.appendChild(imgElement);
      imgWrapper.appendChild(infoOverlay);
      gallery.appendChild(imgWrapper);
    } else {
      console.warn('Image not found for record:', record.id);
    }
  });
  // Hide the loading spinner after the gallery has been populated
  hideLoadingIndicator();
})
.catch(error => {
  console.error('Error fetching data:', error);
  // Also hide the loading spinner in case of an error, so the user isn't left with a perpetual loading screen
  hideLoadingIndicator();
});
