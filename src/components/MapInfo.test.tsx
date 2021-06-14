import { render } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';

import MapInfo from './MapInfo';

it('should render distance info if distance and clear props provided', () => {
  const lat = 45.424721;
  const lng = -75.695000;
  const { container } = render(
    <MapContainer center={[lat, lng]} zoom={13} preferCanvas>
      <MapInfo distance={1000} clear={() => {}} />
    </MapContainer>
  );
  expect(container.querySelector('.map-info')).toBeDefined();
});
