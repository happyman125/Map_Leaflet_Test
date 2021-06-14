import { ReactElement, useEffect, useState } from 'react';
import { TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import convert from 'convert-units';

import { IMarker } from '../interfaces/marker.interface';
import MapInfo from './MapInfo';

function Map(): ReactElement {
  const [startMarker, setStartMarker] = useState<IMarker | null>(null);
  const [endMarker, setEndMarker] = useState<IMarker | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useMapEvents({
    click: (e) => {
      setStartMarker({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
    contextmenu: (e) => {
      if(!startMarker) return;
      setEndMarker({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    }
  });

  const clear = (): void => {
    setStartMarker(null);
    setEndMarker(null);
    setDistance(null);
  };

  useEffect(() => {
    if(!startMarker || !endMarker) return;

    const startLatling = L.latLng(startMarker.lat, startMarker.lng);
    const endLatling = L.latLng(endMarker.lat, endMarker.lng);

    // get distance in meters
    const distanceInMeters = startLatling.distanceTo(endLatling);

    // convert meters to miles
    setDistance(convert(distanceInMeters).from('m').to('mi'));
  }, [startMarker, endMarker]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />

      {startMarker && endMarker && (
        <Polyline positions={[[startMarker.lat, startMarker.lng], [endMarker.lat, endMarker.lng]]} />
      )}

      {startMarker && (
        <Marker position={[startMarker.lat, startMarker.lng]}>
          <Popup>
            Start point
          </Popup>
        </Marker>
      )}

      {startMarker && endMarker && (
        <Marker position={[endMarker.lat, endMarker.lng]}>
          <Popup>
            End point
          </Popup>
        </Marker>
      )}
      {distance && <MapInfo {...{ distance, clear }} />}
    </>
  );
}

export default Map;
