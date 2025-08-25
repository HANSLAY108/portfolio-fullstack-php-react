// src/components/public/LocationSection.jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Don't forget to import the Leaflet CSS

// Fix for default icon issue with Webpack
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const LocationSection = () => {
  // Coordinates for Rondo Point, Dschang, Cameroon
  const position = [5.4450, 10.0550];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Find Our Location
        </h2>

        {/* Map Container - requires a specific height */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
          </MapContainer>
          
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white/80 backdrop-blur-md text-gray-800 font-semibold p-4 rounded-md shadow-lg">
              Currently working remotely, but happy to connect!
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;