import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';

import { IMapInfoProps } from '../interfaces/map-info-props.interface';

const mapInfoStyles = {
  background: '#ffffff',
  padding: '10px',
};

const clearButtonStyles = {
  padding: '10px',
  color: '#05b8fd',
  cursor: 'pointer',
  fontSize: '14px',
};

const mapInfoHtml = (distance: number, clearFn: () => void) => (
  <div data-testid="map-info" style={mapInfoStyles}>
    <span>Distance: {distance.toFixed(3)} miles</span>
    <span style={clearButtonStyles} onClick={clearFn}>clear</span>
  </div>
);

const MapInfo = ({ distance, clear }: IMapInfoProps): null => {
  const context = useLeafletContext();

  useEffect(() => {
    const MapInfoComponent = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'map-info');
        ReactDOM.render(mapInfoHtml(distance, clear), div);
        L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
        return div;
      }
    });
    const mapInfoInstance = new MapInfoComponent({ position: 'topright' });
    mapInfoInstance.addTo(context.map);
    
    return (): void => {
      mapInfoInstance.remove()
    };
  }, [context.map, clear, distance]);

  return null;
};

export default MapInfo;
