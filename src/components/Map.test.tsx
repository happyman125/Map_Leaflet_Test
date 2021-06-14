import { render } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';

import Map from './Map';

it('should render leaflet tiles', () => {
  const lat = 45.424721;
  const lng = -75.695000;
  const { container } = render(
    <MapContainer center={[lat, lng]} zoom={13} preferCanvas>
      <Map />
    </MapContainer>
  );
  expect(container.querySelector('.leaflet-tile-container')).toBeDefined();
});
