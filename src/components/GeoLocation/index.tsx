import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface GeoLocationProps {
  position: [Number, Number];
  carName: string;
}

export function GeoLocation({ position, carName }: GeoLocationProps) {
  console.log(position);
  return (
    <MapContainer style={{ height: "80vh" }} center={position as LatLngExpression} zoom={13} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position as LatLngExpression}>
        <Popup>
          {carName}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
