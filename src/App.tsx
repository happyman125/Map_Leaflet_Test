import { ReactElement, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';

import Map from './components/Map';

function App(): ReactElement {
  // default center
  const lat = 45.424721;
  const lng = -75.695000;

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if(mapContainer) {
      mapContainer.setAttribute('data-testid', 'map');
    }
  }, []);
  return (
    <div className="app">
      <MapContainer center={[lat, lng]} zoom={13} preferCanvas>
        <Map />
      </MapContainer>
    </div>
  );
}

export default App;
