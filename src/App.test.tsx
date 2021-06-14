import { render } from '@testing-library/react';

import App from './App';

it('should render leaflet map', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.leaflet-container')).toBeDefined();
});
